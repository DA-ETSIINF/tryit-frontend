<template>
    <v-dialog
      v-model="isVisible"
      max-width="600px"
    >
        <Login v-if="!$store.getters.getLogged"/>
        <v-alert v-else-if="!$store.getters.getAdmin" type="error">Este usuario no posee permisos de administrador
            <v-btn @click="launchLogout">Cerrar sesión</v-btn>      
        </v-alert>
        <v-card v-else color="primary">
            <v-card-title class="white--text">
                Sorteos TryIT!
            </v-card-title>

            <!-- <v-list three-line>
                <v-list-item>Ganador: {{ winner }}</v-list-item>
                <template v-for="(attendee, index) in attendees">
                    <v-divider :key="index"></v-divider>
                    <v-list-item :key="index">
                        <v-list-item-content>
                            <v-list-item-title>{{ attendee.id }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list> -->

        </v-card>
        <v-card>
            <v-container fluid>
                <v-row 
                    align="center"
                    justify="space-around"
                    class="mt-5"
                >
                    <v-col
                        cols="12"
                        sm="6"
                    >
                        Selección de Premios:
                    </v-col>
                    <v-col
                        cols="12"
                        sm="6"
                    >

                        <v-autocomplete
                            v-model="awardValues"
                            :items="awardNames"
                            append-outer-icon="mdi-trophy"
                            label="Premios"
                            hint="Elige los premios a repartir en el sorteo"
                            persistent-hint
                            auto-select-first
                            clearable
                            deletable-chips
                            multiple
                            rounded
                            small-chips
                            >
                        </v-autocomplete>
                    </v-col>
                </v-row>
                <v-row>
                    <v-checkbox 
                        v-model="isGlobalRaffle"
                        label="¿Tener en cuenta todos los eventos anteriores?"
                        >
                    </v-checkbox>
                </v-row>
                <v-row 
                    align="center"
                    justify="space-around"
                    v-if="winner"
                >

                    <v-spacer></v-spacer>
                        <v-avatar color="green">
                            <v-icon dark>
                                mdi-medal
                            </v-icon>
                        </v-avatar>
                        <h5 class="mx-5"> GANADOR AQUI </h5>
                    <v-spacer></v-spacer>
                </v-row>
            </v-container>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              rounded
              x-large
              dark
              color="accept"
              @click="doLottery()"
            >
              <v-icon 
                left
                x-large
                color="white"
                class="mx-3"
              >
                <!-- mdi-information-outline -->
                mdi-dice-d20-outline
              </v-icon>
              ¡Sortear!
            </v-btn>
            <v-btn
                dark
                rounded
                x-large
                color="close"
                @click="hideDialog"
                >
                <v-icon 
                    left
                    dark
                    x-large
                    color="white"
                    class="mx-3"
                >
                    <!-- mdi-information-outline -->
                    mdi-close
                </v-icon>

                Cerrar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import Login from "./Login"

export default {
    components: {
        Login
    },
    data()  {
        return{
          isVisible: false,
          awards: [], // List of all awards available
          awardIds: [], // IDS of all awards
          awardNames: [], // string names of all awards
          awardValues: [], // List of selected awards for a particular raffle
          isGlobalRaffle: false, // If true, it will take into account attendance to ALL events, 
                                // meaning the more events someone has gone to, the more likely they are to win.
          winner: {}
        }
    },
    async fetch() {
        this.awards = await this.$axios.$get(process.env.api + `/api/awards`)
        for ( var aw of this.awards) {
            console.log(aw)
            this.awardNames.push(aw.item_name)
            console.log(aw.item_name)
            this.awardIds.push(aw.id)
        }

    },
    methods: {
        hideDialog()  {
            this.isVisible = false
        },
        launchLogout() {
            this.$store.commit("logout")
            this.$store.commit("revokeAdminAccess")
        },
        async doLottery() {
            
            let selectedIds = []

            for (const aw of this.awardValues) {
                
                for (let index = 0; index < this.awardIds.length; index++) {
                    const awardId = this.awardIds[index];
                    const awardName = this.awardNames[index]
                    if (awardName == aw) {
                        selectedIds.push(awardId)
                    }
                }

            }

            try {
                var res = await this.$axios.$post(process.env.api + `/api/editions/2022/prizes/`, {
                    is_global: this.isGlobalRaffle,
                    awards: selectedIds
                })

                this.winner = res.data

            } catch (error) {
                this.winner = "Juan"
            }
        }
    },
    created() {
        this.$nuxt.$on("toggleLottery", () => {
            this.isVisible = !this.isVisible
        })
    }
  }
</script>