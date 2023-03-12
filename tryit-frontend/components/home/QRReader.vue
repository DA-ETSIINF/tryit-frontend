<template>
  <v-dialog
    v-model="isQRVisible"
    max-width="600px"
  > 
    <Login v-if="!$store.getters.getLogged"/>
    <v-alert v-else-if="!$store.getters.getScanner && !$store.getters.getAdmin" type="error">Este usuario no posee permisos de administrador
      <v-btn @click="launchLogout">Cerrar sesión</v-btn>      
    </v-alert>

    <v-card v-else>
      <v-alert
      v-model="good_alert"
      type="success"
      close-text="Cerrar"
      color="green"
      dismissible
    >
      ¡Entrada validada adecuadamente!
    </v-alert>
    <v-alert
      v-model="user_already_exists_alert"
      type="error"
      close-text="Cerrar"
      color="red"
      dismissible
    >
      ¡Entrada ya escaneada con anterioridad! No puedes escanear múltiples veces la misma entrada para el mismo evento.
    </v-alert>
    <v-alert
      v-model="error_alert"
      type="error"
      close-text="Cerrar"
      color="red"
      dismissible
    >
      Error al escanear la entrada. Habla con la Delegación de Alumnos de Centro.
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
    <v-alert
      v-model="overlap_alert"
      type="error"
      close-text="Cerrar"
      color="yellow"
      dismissible
    >
    ¡Ya te has registrado a un evento que se solapa con este! No puedes asistir a dos eventos a la vez... >:(
    </v-alert>
    <v-alert
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
          hint="Elige el evento para el que vas a registrar la asistencia"
          persistent-hint
          auto-select-first
          required
        >
        </v-autocomplete>
       </v-col>
      </v-row>
      <div id="QRButton">
        <v-btn 
          color="secondary" 
          block 
          @click="isHidden = !isHidden"
        > Escanear QR 
        </v-btn>  
        <div v-if="isHidden">
          <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
            <div v-if="validationSuccess" class="validation-success">
              Formato de ticket valido, esperando confirmación...
            </div>
            <div v-if="validationFailure" class="validation-failure">
              Formato de ticket inválido
            </div>
            <div v-if="validationPending" class="validation-pending">
              Validando ticket...
            </div>
            <v-btn 
              color="accent"
              block 
              @click="switchCamera"
            >
              <!-- <img src='../../assets/camera-switch.svg' alt="switch camera"> -->
              <v-icon>mdi-camera</v-icon>
            </v-btn>
            
          </qrcode-stream>

        </div>
      </div>
    </v-card>
    <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!--<v-btn
              dark
              rounded
              x-large
              color="info"
              @click="showNoAttendees()"
            >
              <v-icon 
                left
                dark
                x-large
                color="white"
                class="mx-3"
              >
                mdi-information-outline 
                mdi-counter
              </v-icon>

              Número de asistentes
            </v-btn>-->
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

import axios from "axios"
import Login from "./Login"

export default {
  components: {
    Login
  },
  data () {
    return {
      eventValue: [], // Event to be registered
      events: [], // List of all events available
      eventIds: [], // IDS of all events available
      eventNames:[],
      isQRVisible: false,
      isHidden: true,
      isValid: undefined,
      camera: 'auto',
      result: null,
      noRearCamera: false,
      noFrontCamera: false,
      good_alert: false,
      error_alert: false,
      overlap_alert: false,
      user_already_exists_alert: false, // Specific alert that occurs if user already has a ticket
      no_event_alert: false,
    }
  },

  computed: {
    validationPending () {
      return this.isValid === undefined
        && this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    },
  },

  methods: {
    async showNoAttendees(){
      const res = await this.$axios.$post(process.env.api + `/api/attendances/num_attendees/`, {
          event: this.eventValue
      })
    },
    
    hideDialog()  {
        this.isQRVisible = false
    },

    launchLogout() {
      this.$store.commit("logout")
      this.$store.commit("revokeAdminAccess")
    },

    async onInit (promise) {
      const d = new Date();
      let today = d.getFullYear() + "-0" + (d.getMonth()+1) + "-" + d.getDate()
      
      //let today = "2023-03-13" //for testing
      console.log(today)
      this.days = await this.$axios.$get(process.env.api + `/api/editions/2022/schedule`)
      for (var post of this.days) {
        for(var ev of post.events){
          if(post.day == today){
            this.eventNames.push(ev.name)
            this.eventIds.push(ev.id)
          }
        }
      }
      try {
        await promise
      } catch (error) {
        const triedFrontCamera = this.camera === 'front'
        const triedRearCamera = this.camera === 'rear'

        const cameraMissingError = error.name === 'OverconstrainedError'

        if (triedRearCamera && cameraMissingError) {
          this.noRearCamera = true
        }

        if (triedFrontCamera && cameraMissingError) {
          this.noFrontCamera = true
        }
        console.error(error)
      }
      this.resetValidationState()
    },

    resetValidationState () {
      this.isValid = undefined
    },

    switchCamera () {
      switch (this.camera) {
        case 'front':
          this.camera = 'rear'
          break
        case 'rear':
          this.camera = 'front'
          break
      }
    },

    async onDecode (content) {
      this.result = content
      this.turnCameraOff()
      // pretend it's taking really long
      await this.timeout(500)
      try{
        var event_selected = false
        if(this.eventValue.length != 0){
          event_selected = true
        }
        var id = JSON.parse(content).id
        var data = {
            "id": id,
            "event": this.eventValue,
          }
        this.isValid = true
      }
      catch(e){
        this.isValid = false
      }
      // some more delay, so users have time to read the message
      if (this.isValid) {
        if(event_selected){
          
          //this.isHidden = !this.isHidden;
          // hacer post con el ticket 
          const response = await axios.post(process.env.api + "/api/editions/2022/validate_ticket/", data)
          if(response.status == 200){ //Everything went well
            this.good_alert = true;
            this.user_already_exists_alert = false;
            this.error_alert = false;
            this.no_event_alert = false;
          }
          if(response.status == 201){ //User already exists
            this.user_already_exists_alert = true;
            this.error_alert = false;
            this.good_alert = false;
            this.no_event_alert = false;
          }
          if(response.status == 400 || response.status == 500){ //Error
            this.error_alert = true;
            this.user_already_exists_alert = false;
            this.good_alert = false;
            this.no_event_alert = false;
          }
        }
        else{
          this.user_already_exists_alert = false;
          this.error_alert = false;
          this.good_alert = false;
          this.no_event_alert = true;
        }
      }
      await this.timeout(300)
      
      this.turnCameraOn()
    },
    
    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    },
  },
  created() {
    this.$nuxt.$on("toggleQRReader", () => {
      this.isQRVisible = !this.isQRVisible
    })
  }
}
</script>

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .8);
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}
.validation-success {
  color: green;
}
.validation-failure {
  color: red;
}
</style>