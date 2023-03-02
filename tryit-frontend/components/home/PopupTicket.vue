<template>
  <div>
    <div v-if="isTicketFormVisible">
      <v-dialog
        v-model="isVisible"
        max-width="800px"
      >
        <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            block
            height=30vh
            v-bind="attrs"
            v-on="on"
          >
          CONSIGUE TU ENTRADA PULSANDO AQUÍ
          </v-btn>
        </template> -->
        <v-alert
          v-model="good_alert"
          type="success"
          close-text="Cerrar"
          color="green"
          dismissible
        >
          ¡Te has registrado correctamente! Mira tu email para confirmarlo.
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
          Para poder registrarte, necesitas aceptar la política de privacidad y protección de datos. La puedes consultar 
          
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
                      :rules="nameRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="person_last_name"
                      label="Apellidos*"
                      :rules="surnameRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      v-model="person_mail"
                      label="Email*"
                      required
                      :rules="isStudent ? studentEmailRules : normalEmailRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="person_mail2"
                      label="Vuelve a escribir tu mail*"
                      required
                      :rules="confirmEmailRules"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      v-model="person_nif"
                      label="NIF/DNI*"
                      :rules="dniRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="person_phone"
                      label="Teléfono de contacto*"
                      :rules="phoneRules"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      v-model="pass1"
                      label="Contraseña*"
                      :rules="passRules"
                      input type="password"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="7">
                    <v-text-field
                      v-model="pass2"
                      label="Repite tu contraseña*"
                      :rules="confirmRules"
                      input type="password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-checkbox
                      v-model="isStudent"
                      label="Soy estudiante y mi universidad reconoce el TryIT! como actividad acreditable.">
                    </v-checkbox>
                    <v-autocomplete
                      v-model="selectedUniv"
                      v-if="isStudent"
                      :items="universities"
                      v-on:change="getSchools"
                      label="Universidad"
                      :rules="universityRules"
                      required
                    ></v-autocomplete>
                    <v-autocomplete
                      v-model="selectedSchool"
                      v-if="isStudent"
                      :items="schools"
                      v-on:change="getDegrees"
                      label="Centro"
                      :rules="schoolRules"
                      required
                    ></v-autocomplete>
                    <v-autocomplete
                      v-model="selectedDegree"
                      v-if="isStudent"
                      :items="filteredDegrees"
                      label="Titulación"
                      :rules="degreeRules"
                      required
                    ></v-autocomplete>
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
                      Política de Privacidad y Protección de Datos
                    </v-btn>
      
                    al registrarme para el Congreso TryIT!
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
                  Al registrarse para este evento, se considera que consiente y manifiesta haber sido informada/o de que sus datos personales serán tratados por
                  Delegación de Alumnos ETSIINF UPM , que serán responsables de dicho tratamiento conforme a las obligaciones derivadas del cumplimiento del
                  Reglamento (UE) 2016/679 (RGPD) y de la Ley Orgánica 3/2018 de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos
                  digitales. La finalidad de este tratamiento es la de proveerle de una entrada gratuita al evento y habilitar su participación en el mismo;
                  y en el caso de que sea estudiante de una institución educativa que valore la participación en el Congreso TryIT!, acreditar su participación
                  de cara a dicha institución, proporcionándo a las autoridades competentes de la misma los datos que sean necesarios para su acreditación. 
                  Tiene derecho a acceder, rectificar y suprimir los datos en cualquier momento escribiendo un correo a tryit.da@fi.upm.es .
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
    <div v-else >
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
          isTicketFormVisible: true,
          universities: [],
          selectedUniv: "",
          schools: [],
          selectedSchool: "",
          degrees: [],
          filteredDegrees: [],
          selectedDegree: "",
          person_name: "",
          person_last_name: "",
          person_mail: "",
          person_mail2: "",
          person_nif: "",
          person_phone: "",
          good_alert: false,
          error_alert: false,
          user_already_exists_alert: false, // Specific alert that occurs if user already has a ticket
          pass1: "",
          pass2: "",
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
            v => (v && v.length <= 10) || 'Su DNI/NIF/NIE debe tener 10 o menos caracteres'
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
      async validateAndPost() {
        if(this.$refs.form.validate())  {
          
          var is_upm = false
          if (this.acceptsPrivacyPolicy != true) {

            this.must_accept_privacy_terms_alert = true
            return
          }
          if( this.selectedUniv == "Universidad Politécnica de Madrid" ) {
            is_upm = true
          }

          var data = {
            "name": this.person_name,
            "lastname": this.person_last_name,
            "nif": this.person_nif,
            "email": this.person_mail,
            "password": this.pass1,
            "phone": this.person_phone,
            "degree": this.selectedDegree,
            "is_upm_student": is_upm,
            "year": "2023" // @TODO This is hardcoded and should be changed.
          }
          
          try {
            const res = await this.$axios.post(process.env.api + "/api/editions/2023/create_ticket/", data)
          
            if (res.status == 200 ) {
              // Everything went fine with the request
              this.good_alert = true
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
      }
    },
    created() {
      this.$nuxt.$on("toggleTicketForm", () => {
        this.isVisible = !this.isVisible
      })
    }
  }
</script>