<template>
  <!--<v-row justify="center">-->
    <v-dialog
      v-model="isVisible"
      max-width="600px"
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
        ¡Entrada generada adecuadamente!
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
        v-model="error_alert"
        type="error"
        close-text="Cerrar"
        color="red"
        dismissible
      >
        Error al generar la entrada. Habla con la Delegación de Alumnos de Centro.
      </v-alert>
      <v-card color="primary">
          <v-card-title class="white--text primary text-h5">¿Quieres asistir al TryIT! ? ¡Obtén tu entrada!</v-card-title>
          <v-card class="pa-5">  
            <v-form
              ref="form"
            >
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model="person_name"
                    label="Nombre*"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="person_last_name"
                    label="Apellidos*"
                    :rules="surnameRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="person_mail"
                    label="Email*"
                    required
                    :rules="emailRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="person_nif"
                    label="NIF/DNI*"
                    :rules="dniRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model="person_phone"
                    label="Teléfono de contacto*"
                    :rules="phoneRules"
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
                    :items="universityNames"
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
                    :items="grades"
                    label="Titulación"
                    :rules="degreeRules"
                    required
                  ></v-autocomplete>
                </v-col>
              </v-row>
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
    </v-dialog>
  <!--</v-row>-->
</template>

<script>

export default {
    data()  {
        return{
          isVisible: false,
          isStudent: false,
          universities: [],
          universityNames: [],
          selectedUniv: "",
          schools: [],
          selectedSchool: "",
          grades: [],
          selectedDegree: "",
          person_name: "",
          person_last_name: "",
          person_mail: "",
          person_nif: "",
          person_phone: "",
          good_alert: false,
          error_alert: false,
          user_already_exists_alert: false // Specific alert that occurs if user already has a ticket
        }
    },
    computed: {
      emailRules () { 
        return [
            v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) || 'Introduzca un email válido',
            v => !!v || 'Introduzca su email'
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
            v => !!v || 'Introduzca su universidad'
          ]},
          schoolRules () { 
            return  [
            v => !!v || 'Introduzca su escuela'
          ]},
          degreeRules () { 
            return  [
            v => !!v || 'Introduzca su grado'
          ]},
    },
    async fetch() {
      this.universities = await this.$axios.$get(`http://127.0.0.1:8000/api/degrees/universities`)
      for(const university in this.universities)  {
        this.universityNames.push(university)
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
      getSchools()  {
        this.schools = this.universities[this.selectedUniv]
      },
      async getDegrees() {
        const gradesInfo = await this.$axios.get("http://127.0.0.1:8000/api/degrees", {
          params: { school: this.selectedSchool }
        })
        for(let i = 0; i < gradesInfo.data.length; ++i) {
          this.grades.push(gradesInfo.data[i].degree)
          console.log(gradesInfo.data[i].degree)
        }
        console.log(this.grades)
      },
      async validateAndPost() {
        if(this.$refs.form.validate())  {
          
          var is_upm = false

          if( this.selectedUniv == "Universidad Politécnica de Madrid" ) {
            is_upm = true
          }

          var data = {
            "name": this.person_name,
            "lastname": this.person_last_name,
            "nif": this.person_nif,
            "email": this.person_mail,
            "phone": this.person_phone,
            "degree": this.selectedDegree,
            "is_upm_student": is_upm,
            "year": "2022" // @TODO This is hardcoded and should be changed.
          }

          try {
            const res = await this.$axios.post("http://127.0.0.1:8000/api/editions/2022/create_ticket/", data)
          
            if (res.status == 200 ) {
              // Everything went fine with the request
              this.good_alert = true
            }
            // Else
          } catch (error) {
            
            console.log(error.response.status)
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