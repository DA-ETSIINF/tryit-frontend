<template>
    
    <v-dialog
      v-model="isVisible"
      max-width="600px"
    >
        <v-alert
            v-model="nif_404_alert"
            type="error"
            close-text="Cerrar"
            color="error"
            dismissible
            >
            El NIF introducido no corresponde a ninguna entrada del TryIT! 2022, o no está escrito correctamente. 
        </v-alert>
        <v-card  color="primary">
            <v-card-title class="white--text">
                Consulta tus ECTS
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
                        cols="3"
                        sm="10"
                    >

                    Introduce tu DNI para conocer los créditos que te corresponden por
                    haber asistido al X aniversario del TryIT!.
                </v-col>
                
            </v-row>
                <v-row 
                    align="center"
                    justify="space-around"
                    class="mt-5"
                >
                <v-form
                    ref="form"
                >
                <v-text-field
                  v-model="nif"
                  label="NIF*"
                  :rules="nameRules"
                  required
                ></v-text-field>
                </v-form>
                </v-row>
                <v-row 
                    align="center"
                    justify="space-around"
                    v-if="credits"
                >

                    <v-spacer></v-spacer>
                        <v-avatar color="green">
                            <v-icon dark>
                                mdi-hand-coin
                            </v-icon>
                        </v-avatar>
                        <h5 class="mx-5"> {{credits}} </h5>
                    <v-spacer></v-spacer>
                </v-row>
            <v-card-actions>
            <v-spacer></v-spacer>
            
            <v-btn
              rounded
              x-large
              dark
              color="accept"
              @click="ectsQuery()"
            >
              <v-icon 
                left
                x-large
                color="white"
                class="mx-3"
              >
                <!-- mdi-information-outline -->
                mdi-hand-coin
              </v-icon>
              Ver mis créditos
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
          nif_404_alert: false,
          isVisible: false,
          nif: "", // Event to be registered
          credits: null,
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
        async ectsQuery() {


            try {
                const res = await this.$axios.$post(process.env.api + `/api/editions/2022/ects_query/`, {
                    nif: this.nif
                })
                this.credits = "Te corresponden " + res.ects + " ECTS"

            } catch (error) {
                console.log(error)
                this.nif_404_alert = true
            }
        },
        showInfo(){
            this.show_info_alert = true
        }
    },
    created() {
        this.$nuxt.$on("toggleViewEcts", () => {
            this.isVisible = !this.isVisible
        })
    }
  }
</script>