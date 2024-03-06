<template>
  <div>
    <div v-if="isTicketFormVisible && !hasTicket()">
      <v-dialog
        v-model="isVisible"
        max-width="800px"
      >
        <v-alert
          v-model="good_alert"
          type="success"
          close-text="Cerrar"
          color="green"
          dismissible
        >
          ¡Te has registrado correctamente! En unos momentos recibirás un email con tu entrada.
        </v-alert>
        <v-alert
          v-model="user_already_exists_alert"
          type="error"
          close-text="Cerrar"
          color="red"
          dismissible
        >
          ¡Ya te has registrado! No puedes generar una nueva entrada. Si has cometido algún error, contacta a tu Delegación de Centro.
        </v-alert>
      
        <v-alert
          v-model="must_accept_privacy_terms_alert"
          type="error"
          close-text="Cerrar"
          color="red"
          dismissible
        >
          Para poder obtener tu entrada, necesitas aceptar la política de privacidad y protección de datos, y la cesión de los derechos de imagen. Las puedes consultar 
          
          <v-btn
            depressed
            color="primary"
            @click="togglePrivacyPolicyVisibility()"
            plain
          >
            aquí. 
          </v-btn>
        </v-alert>
        <v-alert
          v-model="error_alert"
          type="error"
          close-text="Cerrar"
          color="red"
          dismissible
        >
          Error al registrarte. Habla con la Delegación de Alumnos de Centro.
        </v-alert> 
        <v-card color="primary">
            <v-card-title class="white--text primary text-h5">¿Quieres asistir al TryIT! ? ¡Obtén tu entrada!</v-card-title>
            <v-card class="pa-5">  
              <v-form
                ref="form"
              >
                <v-row>
                  <v-col cols="5">
                    <v-text-field
                      v-model="person_name"
                      label="Nombre*"
                      readonly=true
                      disabled=true
                    ></v-text-field>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="person_last_name"
                      label="Apellidos*"
                      readonly=true
                      disabled=true
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      v-model="person_nif"
                      label="NIF/DNI*"
                      readonly=true
                      disabled=true
                    ></v-text-field>  
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="person_mail"
                      label="Email*"
                      readonly=true
                      disabled=true
                    ></v-text-field>
                  </v-col>
                </v-row>
      
              <!-- LOPD -->
              <v-checkbox v-model="acceptsPrivacyPolicy">
                <template v-slot:label>
                  <div>
                    Acepto la
                    <v-btn
                      depressed
                      color="primary"
                      @click="togglePrivacyPolicyVisibility()"
                      plain
                    >
                      Política de Privacidad y Protección de Datos y la Cesión de derechos de Imágen.
                    </v-btn>
    
                  </div>
                </template>
              </v-checkbox>
      
              <small>*Este símbolo indica campo obligatorio</small>
              <v-spacer></v-spacer>
              <v-row
                align="center"
                justify="space-around"
                class="mt-5"
              >
                <v-btn
                  rounded
                  x-large
                  dark
                  color="accept"
                  @click="validateAndPost"
                >
                  <v-icon 
                    left
                    x-large
                    color="white"
                    class="mx-3"
                  >
                    <!-- mdi-information-outline -->
                    mdi-check
                  </v-icon>
                  Conseguir entrada
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
              </v-row>
            </v-form>
          </v-card>
          </v-card>
      
          <!-- LOPD -->
      
          <template>
            <v-dialog
              v-model="isPrivacyPolicyVisible"
              max-width="600px"
            >
              <v-card>
                <v-card-title>
                  Aviso de Política de Privacidad y Protección de Datos
                </v-card-title>
                <v-spacer/>
                <v-card-subtitle>
                  Estimado/a Participante: 
                </v-card-subtitle>
                <v-card-text>
                  Al registrarse para este evento, acepta la  
                  <v-btn
                  depressed
                  color="primary"
                  href="${process.env.api}/api/editions/get_privacy"
                  target="_blank"
                  plain
                  >Politica de protección de datos 
                </v-btn>
                y la 
                  <v-btn
                  depressed
                  color="primary"
                  href="${process.env.api}/api/editions/get_image_rights"
                  target="_blank"
                  plain
                  >Cesión de derechos de imágen.
                </v-btn>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    rounded
                    x-large
                    dark
                    color="accept"
                    @click="privacyAndCloseWindow(true)"
                  >
                    <v-icon 
                      left
                      x-large
                      color="white"
                      class="mx-3"
                    >
                      <!-- mdi-information-outline -->
                      mdi-check
                    </v-icon>
                    Aceptar Politica
                  </v-btn>
                  <v-btn
                      dark
                      rounded
                      x-large
                      color="orange darken-3"
                      @click="privacyAndCloseWindow(false)"
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
          <!--</v-row>-->
        </template>
      
        </v-dialog>
    </div>
    <div v-else-if="isTicketFormVisible && !this.$auth.loggedIn">
      <v-dialog
        v-model="isVisible"
        max-width="610px"
      >
        <v-card>
          <v-card-title>Para obtener tu entrada, necesitas iniciar sesión o registrarte.</v-card-title>
          <v-card-text>¡Regístrate o inicia sesión para obtener tu entrada!</v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              small
              outlined
              :style="{left: '50%', transform:'translateX(-50%)'}"
              @click="loginSIU"
            >
              <v-icon 
                dark
                dense
                color="primary"
                left
              >
                <!-- mdi-information-outline -->
                mdi-login
              </v-icon>
              Iniciar Sesión/Registro
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div v-else-if="!isTicketFormVisible" >
    <template>  
      <v-dialog
        v-model="isVisible"
        max-width="610px"
      >    
      <v-card >
          <v-card-title>Las entradas estarán disponibles unas semanas antes del evento.</v-card-title>
            <v-card-text>¡Síguenos en nuestras redes sociales para enterarte de cuándo estarán disponibles!</v-card-text>
            <v-container>
              <v-card-actions >
                <v-row>
                    <v-col>
                      <v-btn
                            color="primary"
                            small
                            outlined
                            :style="{left: '50%', transform:'translateX(-50%)'}"
                            href="https://www.instagram.com/tryit_upm/?hl=es"
                            target="_blank"
                        >
                            <v-icon 
                              dark
                              dense
                              color="primary"
                              left
                            >
                              <!-- mdi-information-outline -->
                              mdi-instagram
                            </v-icon>
                            Instagram
                        </v-btn>
                      </v-col>
                    <v-col>
                          <v-btn
                              color="primary"
                              small
                              outlined
                              :style="{left: '50%', transform:'translateX(-50%)'}"
                              href="https://www.twitter.com/tryit_upm/?hl=es"
                              target="_blank"
                            >
                            <v-icon 
                              dark
                              dense
                              color="primary"
                              left
                            >
                              <!-- mdi-information-outline -->
                              mdi-twitter
                            </v-icon>
                              Twitter
                          </v-btn>
                    </v-col>
                      
                </v-row>
              </v-card-actions>
            </v-container>
        </v-card>
      </v-dialog>
    </template>
    </div>
  </div>
</template>

<script>

export default {
    data()  {
        return{
          isVisible: false,
          isStudent: false,
          isPrivacyPolicyVisible: false,
          acceptsPrivacyPolicy: false,
          must_accept_privacy_terms_alert: false, // Alert that pops up when a user tries to create a ticket without accepting the privacy terms
          isTicketFormVisible: false,
          person_name: "",
          person_last_name: "",
          person_mail: "",
          person_nif: "",
          good_alert: false,
          error_alert: false,
          user_already_exists_alert: false, // Specific alert that occurs if user already has a ticket
        }
    },
    computed: {
          normalEmailRules () { 
          return [
            v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) || 'Introduzca un email válido',
            v => !!v || 'Introduzca su email'
          ]},
          studentEmailRules () { 
          return [
            v => !v || /^\w+([.-]?\w+)*@alumnos\.upm\.es$/.test(v) || 'Introduce tu mail institucional (@alumnos.upm.es)',
            v => !!v || 'Introduzca su email'
          ]},
          confirmEmailRules () {
          return [
            v => !!v || "Confirme su email",
            v => v === this.person_mail || "Los dos emails no coinciden"
          ]},
          nameRules () { 
            return [
            v => !!v || 'Introduzca su nombre',
            v => (v && v.length <= 25) || 'El nombre debe tener menos de 25 caracteres'
          ]},
          surnameRules () { 
            return [
            v => !!v || 'Introduzca sus apellidos',
            v => (v && v.length <= 50) || 'Los apellidos deben estar compuestos por menos de 50 caracteres'
          ]},
          dniRules () { 
            return [
            v => !!v || 'Introduzca su DNI/NIF/NIE',
            v =>  /^[A-Z0-9]+$/.test(v) || 'Su DNI/NIF/NIE debe contener únicamente mayúsculas y números',
            v => this.validarIdentificacion(v),
          ]},
          phoneRules () { 
            return [
            v => !!v || 'Introduzca su número de teléfono',
            v => !v || /\+{0,1}[0-9]{9,12}/.test(v) || 'Su número de teléfono debe contener entre 9 y 12 dígitos' 
          ]},
          universityRules () { 
            return  [
            v => !!v || 'Seleccione su universidad'
          ]},
          schoolRules () { 
            return  [
            v => !!v || 'Seleccione su escuela'
          ]},
          degreeRules () { 
            return  [
            v => !!v || 'Seleccione su grado'
          ]},
          passRules () {
          return [
            v => !!v || 'Introduzca una contraseña',
            v => !v || /.{8,}/.test(v) || "La contraseña debe tener al menos 8 dígitos"
          ]},
          confirmRules () {
          return [
            v => !!v || "Confirme su contraseña",
            v => v === this.pass1 || "Las contraseñas no coinciden"
          ]},
    },
    async fetch() {
      this.degrees = await this.$axios.$get(process.env.api + `/api/degrees`)
        for(let i = 0; i < this.degrees.length; ++i) {
          this.universities.push(this.degrees[i].university)
        }
    },
    /*computed:   {
      changeVisibility()  {
        this.isVisible = this.$store.state.isTicketFormVisible
      }
    },*/
    methods: {
      hideDialog()  {
        this.isVisible = false
      },
      togglePrivacyPolicyVisibility() {
        this.isPrivacyPolicyVisible = !this.isPrivacyPolicyVisible
      },
      privacyAndCloseWindow(did_accept_policy) {
        this.acceptsPrivacyPolicy = did_accept_policy  // true if accepted false if not
        this.must_accept_privacy_terms_alert = !did_accept_policy
        this.togglePrivacyPolicyVisibility()
      },
      getSchools()  {
        this.schools = []
        this.degrees.map(degree => {
          if(degree.university === this.selectedUniv) {
            this.schools.push(degree.school)
          }
        })

      },
      getDegrees() {
        this.filteredDegrees = []
        this.degrees.map(degree =>  {
          if(degree.school === this.selectedSchool)  {
            this.filteredDegrees.push(degree.degree)
          }
        })
      },
      async getPrivacyPDF() {
        const res = await this.$axios.post(process.env.api + "/api/editions/get_privacy", data)
      },
      async getImagePDF() {
        const res = await this.$axios.post(process.env.api + "/api/editions/get_image_rights", data)
      },
      async validateAndPost() {
        if(this.$refs.form.validate())  {
          
          if (this.acceptsPrivacyPolicy != true) {
            
            this.must_accept_privacy_terms_alert = true
            return
          }
          try {
            const res = await this.$axios.post(`${process.env.api}/api/editions/${process.env.edition}/create_ticket/`)
            if (res.status == 201 ) {
              // Everything went fine with the request
              this.good_alert = true
              this.$auth.fetchUser() // Fetch user to update the ticket
            }
            // Else
          } catch (error) {
            
            if (error.response.status == 409)  {
              this.user_already_exists_alert = true
            } else {
              this.error_alert = true
            }

          }

        }
      },
      validarIdentificacion(nif) {
        nif = nif.toUpperCase().replace(/[_\W\s]+/g, '');
        var esDni = /^(\d|[XYZ])\d{7}[A-Z]$/.test(nif);
        var esNif = /^[ABCDEFGHJKLMNPQRSUVW]\d{7}[\dA-J]$/.test(nif)
        if(esDni) {
            var num = nif.match(/\d+/);
            num = (nif[0]!='Z'? nif[0]!='Y'? 0: 1: 2)+num;
            if(nif[8]=='TRWAGMYFPDXBNJZSQVHLCKE'[num%23]) {
                return /^\d/.test(nif)? true: true;
            }
        }
        else if(esNif) {
            for(var sum=0,i=1;i<8;++i) {
                var num = nif[i]<<i%2;
                sum += int(num/10)+num%10
            }
            var c = (10-su)%10;
            if( ((/[KLMNPQRSW]/.test(nif[0]) || (nif[1]+nif[2])=='00') && nif[8]=='JABCDEFGHI'[c]) ||
                (/[ABEH]/.test(nif[0]) && nif[8]==c) ||
                (/[CDFGJUV]/.test(nif[0]) && (nif[8]=='JABCDEFGHI'[c] || nif[8]==c)) ) {
                return /^[KLM]/.test(nif)? true: true;
            }
        }
        return "Tu DNI/NIF/NIE no es válido";
        },
      loginSIU() {
        this.$auth.loginWith("SIU")
      },
      hasTicket() {
        return this.$auth.loggedIn && this.$auth.user.ticket_id !== "undefined"
      }
},
    created() {
      this.$nuxt.$on("toggleTicketForm", () => {
        this.isVisible = !this.isVisible
        if(this.isVisible && this.$auth.loggedIn) {
          this.person_name = this.$auth.user.name
          this.person_last_name = this.$auth.user.surname
          this.person_mail = this.$auth.user.email
          this.person_nif = this.$auth.user.nif
        }
      })
    }
  }
</script>