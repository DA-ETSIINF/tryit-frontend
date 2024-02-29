<template>
    
    <v-dialog
      v-model="isVisible"
      max-width="600px"
    >
    
        <v-alert  v-if="!this.$auth.loggedIn || !this.$auth.user.isadmin" type="error">Este usuario no posee permisos de administrador
        </v-alert>
        <v-alert
            v-model="show_info_alert"
            type="info"
            close-text="Cerrar"
            color="info"
            dismissible
            >
            El ganador es {{winner_info}}
        </v-alert>
        <v-alert
            v-model="no_event_alert"
            type="error"
            close-text="Cerrar"
            color="yellow"
            dismissible
            >
            ¡Debes seleccionar un evento antes de escanear una entrada!
        </v-alert>
        <v-alert v-if="this.isWinner" type="success" dismissible>El ganador es {{winner}}</v-alert>
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
             <v-row 
                align="center"
                justify="space-around"
                class="mt-5"
            >
                <v-col
                    cols="12"
                    sm="6"
                >
                    Selección de Eventos:
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                >
                <v-autocomplete
                    v-model="eventValue"
                    :items="eventNames"
                    append-outer-icon="mdi-calendar"
                    label="Eventos"
                    hint="Elige el evento para el que vas a realizar el sorteo"
                    persistent-hint
                    auto-select-first
                    >
                </v-autocomplete>
                </v-col>
            </v-row>
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
                        label="Sorteo global. Tiene en cuenta todos los eventos anteriores"
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
                        <h5 class="mx-5"> {{winner}} </h5>
                    <v-spacer></v-spacer>
                </v-row>
            </v-container>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              v-if="winner"
              rounded
              x-large
              dark
              color="info"
              @click="showInfo()"
            >
              <v-icon 
                left
                x-large
                color="white"
                class="mx-3"
              >
                <!-- mdi-information-outline -->
                mdi-information-outline
              </v-icon>
              Información ganador
            </v-btn>
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


export default {
    data()  {
        return{
          eventValue: [], // Event to be registered
          events: [], // List of all events available
          eventIds: [], // IDS of all events available
          eventNames:[],
          isVisible: false,
          isWinner: false,
          awards: [], // List of all awards available
          awardIds: [], // IDS of all awards
          awardNames: [], // string names of all awards
          awardValues: [], // List of selected awards for a particular raffle
          isGlobalRaffle: false, // If true, it will take into account attendance to ALL events, 
                                // meaning the more events someone has gone to, the more likely they are to win.
          no_event_alert: false,
          winner: {},
          winner_info: "",
          show_info_alert: false,
        }
    },
    async fetch() {
        const d = new Date();
        let today = d.getFullYear() + "-0" + (d.getMonth()+1) + "-" + d.getDate()
        //today = "2024-03-19"; //for testing
        this.days = await this.$axios.$get(`${process.env.api}/api/editions/${process.env.edition}/schedule`)
        for ( var post of this.days) {
            for(var ev of post.events){
                if(post.day == today){
                    this.eventNames.push(ev.name)
                    this.eventIds.push(ev.id)
                }
            }
        }
        //console.log(this.days)
        this.awards = await this.$axios.$get(process.env.api + `/api/awards`)
        for ( var aw of this.awards) {
            //console.log(aw)
            this.awardNames.push(aw.item_name)
            //console.log(aw.item_name)
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
                const res = await this.$axios.$post(`${process.env.api}/api/editions/${process.env.edition}/prizes/`, {
                    is_global: this.isGlobalRaffle,
                    awards: selectedIds,
                    event: this.eventValue,
                })
                //console.log(res)
                this.winner = res.winner.name + " " +  res.winner.surname
                this.winner_info = this.winner + " con " + res.winner.nif
                //console.log(this.winner)
                this.isWinner = true

            } catch (error) {
                //console.log(error)
                this.winner = "Error al realizar el sorteo"
                this.isWinner = false
            }
        },
        showInfo(){
            this.show_info_alert = true
        }
    },
    created() {
        this.$nuxt.$on("toggleLottery", () => {
            this.isVisible = !this.isVisible
        })
    }
  }
</script>