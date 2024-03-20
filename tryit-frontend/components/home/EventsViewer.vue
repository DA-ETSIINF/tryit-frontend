<template>  
    <v-dialog
    v-model="isVisible"
    max-width="1000px"
    >
    <v-alert
        v-if="event_error"
        type="error"
        close-text="Cerrar"
        color="green"
        dismissible
        >
            Error al cargar tus eventos. Inténtalo de nuevo más tarde.
      </v-alert>
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
        <v-card-title v-if="this.$auth.loggedIn" class="text-h6 text-md-h5 text-lg-h4 justify-center"> {{ this.$auth.user.name }}, de momento te corresponden {{ this.total_ects }} ECTS</v-card-title>
        <v-container>
            <template>
            <v-timeline 
                v-if="this.items && this.items.length > 0"
                density="compact"
                side="end"
                >
                <v-timeline-item
                v-for="item in items"
                :key="item.id"
                :dot-color="item.color"
                size="small"
                >
                <v-card>
                    
                    <v-card-title :class="['text-h6', `bg-${item.color}`,(item.id%2 == 0)? 'text-right': 'text-left']">
                    {{item.title}}
                    </v-card-title>
                    <v-card-subtitle  :class="['bg-white', 'text--primary', (item.id%2 == 0)? 'text-right': 'text-left']">
                        ECTS: {{ item.ects }} 
                    </v-card-subtitle>
                </v-card>
                </v-timeline-item>
            </v-timeline>
        </template>
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
                        <div v-if="windowWidth > 475">
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
                        </div>
                        <div v-else> 
                            <v-icon 
                                dark
                                dense
                                color="primary"
                                left
                            >
                                <!-- mdi-information-outline -->
                                mdi-email-fast
                            </v-icon>
                            Reenviar Entrada
                        </div>
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
          event_error: false,
          items: [],
          total_ects: 0,
          windowWidth:  process.client ? window.innerWidth : 0,
        }
    },
    mounted(){
            window.onresize = () => {
                if(process.client){
                    this.windowWidth =  window.innerWidth}
            }
    },
    watch: {

    },
    
    methods: {
        
        hideDialog()  {
            this.isVisible = false
        },
        launchLogout() {
            this.$store.commit("logout")
            this.$store.commit("revokeAdminAccess")
        },
        async get_events() {
            let res;
            try{
                res = await this.$axios.get(`${process.env.api}/api/editions/${process.env.edition}/get_events/`)
            }
            catch(error){
                console.log(error)
                this.event_error = true
                return
            };
            this.total_ects = 0
            this.items = []
            let i = 0
            //console.log(res.data)
            for (event of res.data){
                i++
                this.items.push({
                    id: i,
                    time: event.start_date,
                    title: event.name,
                    color: 'red',
                    ects: event.event_ects
                })
                this.total_ects += event.event_ects
            }
            this.total_ects = parseFloat(this.total_ects.toFixed(4)); 
                
        },
        async resendTicket() {
            try{
                const res = await this.$axios.get(process.env.api + "/api/users/resend_ticket/")
                this.ticket_email_sent_ok = true
            }
            catch(error){
                console.log(error)
                this.erro = true
            };
        },
        showInfo(){
            this.show_info_alert = true
        }
    },
    created() {
        this.$nuxt.$on("toggleEvViewer", () => {
            this.isVisible = !this.isVisible
            if(this.isVisible){
                this.get_events()
            }
        })
    }
  }
</script>