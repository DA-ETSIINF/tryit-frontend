<template>  
    <v-dialog
    v-model="isVisible"
    max-width="1000px"
    >
    <v-alert
        v-if="ticket_email_sent_ok"
        type="success"
        close-text="Cerrar"
        color="green"
        dismissible
        >
            ¡Correo con tu entrada reenviado! Revisa tu bandeja de entrada.
      </v-alert>
      <v-alert
        v-else-if="ticket_email_sent_error"
        type="error"
        close-text="Cerrar"
        color="red"
        dismissible
        >
            ¡Error al reenviar la entrada! Inténtalo de nuevo más tarde.
      </v-alert>
    <v-card >
        <v-card-title> En esta pestaña podrás ver los eventos a los que has asistido durante el congreso.</v-card-title>
        <v-container>
            <v-card-actions >
            <v-row>
                <v-col>
                    <v-btn
                        v-if="!ticket_email_sent_ok"
                        color="primary"
                        small
                        outlined
                        :style="{left: '50%', transform:'translateX(-50%)'}"
                        @click="resendTicket"
                        target="_blank"
                    >
                        <v-icon 
                            dark
                            dense
                            color="primary"
                            left
                        >
                            <!-- mdi-information-outline -->
                            mdi-email-fast
                        </v-icon>
                        ¿Necesitas que te volvamos a enviar tu entrada?
                    </v-btn>
                    </v-col>           
            </v-row>
            </v-card-actions>
        </v-container>
    </v-card>
    </v-dialog>
</template>

<script>
import Login from "./Login"
import axios from "axios"

export default {
    components: {
        Login
    },
    data()  {
        return{
          isVisible: false,
          ticket_email_sent_ok: false,
          ticket_email_sent_error: false,
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
        async resendTicket() {
            const userToken = this.$store.getters.getToken
            const config = {
                headers: {
                    Authorization: "Token " + userToken,
                }
            }
            try{
                const res = await axios.get(process.env.api + "/api/users/resend_ticket/", config)
                this.ticket_email_sent_ok = true
            }
            catch(error){
                console.log(error)
                this.ticket_email_sent_error = true
            };
        },
        showInfo(){
            this.show_info_alert = true
        }
    },
    created() {
        this.$nuxt.$on("toggleEvViewer", () => {
            this.isVisible = !this.isVisible
        })
    }
  }
</script>