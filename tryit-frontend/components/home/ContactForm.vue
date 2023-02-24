<template>
    
    <v-dialog
      v-model="isVisible"
      max-width="600px"
    >
        <v-alert
            v-model="contact_400_alert"
            type="error"
            close-text="Cerrar"
            color="error"
            dismissible
            >
            Ha habido un error al enviar el mensaje de contacto
        </v-alert>
        <v-alert
            v-model="show_info_alert"
            type="info"
            close-text="Cerrar"
            color="info"
            dismissible
            >
            Se ha envidado el mensaje de contacto correctamente
        </v-alert>
        <v-card  color="primary">
            <v-card-title class="white--text">
                Contacta con nosotros
            </v-card-title>


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

                    Introduce tu nombre, correo y mensaje para contactar con nosotros.
                </v-col>
                
            </v-row>
                <v-row 
                    flex-grow="1"
                    class="mt-5, mx-10"
                    sm="10"
                >
                <v-form
                    ref="form"
                >
                <v-text-field
                  justify="center"
                  v-model="name"
                  label="NOMBRE*"
                  :rules="nameRules"
                  required
                ></v-text-field>
                <v-text-field
                  justify="center"
                  v-model="email"
                  label="CORREO*"
                  type="email"
                  required
                ></v-text-field>
                <v-textarea
                  v-model="message"
                  density="confortable"
                  flex-grow="1"
                  sm="10"
                  single-line="false"
                  label="MENSAJE*"
                  :rules="nameRules"
                  required
                ></v-textarea>
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
              @click="contactFormQuery()"
            >
              <v-icon 
                left
                x-large
                color="white"
                class="mx-3"
              >
                <!-- mdi-information-outline -->
                mdi-send
              </v-icon>
              Enviar mensaje
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
          contact_400_alert: false,
          show_info_alert: false,
          isVisible: false,
          name: "",
          email: "",
          message: "",
          credits: null,
        }
    },
    
    methods: {
        
        hideDialog()  {
            this.isVisible = false
        },
        async contactFormQuery() {


            try {
                const res = await this.$axios.$post(process.env.api + `/api/contact/send_message/`, {
                    full_name: this.name,
                    email: this.email,
                    message: this.message
                })
                this.show_info_alert = true

            } catch (error) {
                console.log(error)
                this.contact_400_alert = true
            }
        },
    },
    created() {
        this.$nuxt.$on("toggleContactForm", () => {
            this.isVisible = !this.isVisible
        })
    }
  }
</script>