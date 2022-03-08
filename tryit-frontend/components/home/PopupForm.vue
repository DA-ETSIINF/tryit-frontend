<template>
  <!--<v-row justify="center">-->
    <v-dialog
      v-model="isVisible"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
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
      </template>
          <v-card class="pa-5">
            <v-form
              ref="form"
            >
            <span class="text-h5">Formulario Entrada TryIT!</span>
              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model= person_name
                    label="Nombre*"
                    :rules="nameRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model= person_last_name
                    label="Apellidos*"
                    :rules="surnameRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model= person_mail
                    label="Email*"
                    required
                    :rules="emailRules"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model= person_nif
                    label="NIF/DNI*"
                    :rules="dniRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-model= person_phone
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
                    label="Soy estudiante universitario">
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
                    v-on:change="getGrades"
                    label="Escuela"
                    :rules="schoolRules"
                    required
                  ></v-autocomplete>
                  <v-autocomplete
                    v-model="selectedDegree"
                    v-if="isStudent"
                    :items="grades"
                    label="Grados"
                    :rules="degreeRules"
                    required
                  ></v-autocomplete>
                </v-col>
              </v-row>
            <small>*Este símbolo indica campo obligatorio</small>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="hideDialog"
            >
              Cerrar
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="validateAndPost"
            >
              Conseguir entrada
            </v-btn>
          </v-form>
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
          person_phone: ""
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
      async getGrades() {
        const gradesInfo = await this.$axios.get("http://127.0.0.1:8000/api/degrees", {
          params: { school: this.selectedSchool }
        })
        for(let i = 0; i < gradesInfo.data.length; ++i) {
          this.grades.push(gradesInfo.data[i].degree)
          console.log(gradesInfo.data[i].degree)
        }
        console.log(this.grades)
      },
      validateAndPost() {
        if(this.$refs.form.validate())  {
          
          // person = models.Person()
          // attendee.id = person
          // attendee.degree = models.Degree.objects.get(degree=data["degree"])
          // attendee.year = data['year']

          var is_upm = false

          if( this.selectedUniv == "Universidad Politécnica de Madrid" ) {
            console.log( this.selectedUniv )
            is_upm = true
            // console.log( this.universityNames[this.selectedUniv] )
          }

          var data = {
            "name": this.person_name,
            "lastname": this.person_last_name,
            "nif": this.person_nif,
            "email": this.person_mail,
            "phone": this.person_phone,
            "degree": this.selectedDegree,
            "is_upm_student": is_upm,
            "year": "2022"
          }

          // Axios
          this.$axios.post("http://127.0.0.1:8000/api/editions/2022/create_ticket/", data).then((response) => {
            console.log(response)
            this.hideDialog()
          })

          this.hideDialog()
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