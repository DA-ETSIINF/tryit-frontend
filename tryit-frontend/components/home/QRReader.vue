<template>
  <v-dialog
    v-model="isQRVisible"
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
      QR
      </v-btn>
    </template> -->
    <!-- <v-card>HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH</v-card> -->
    <Login v-if="!$store.getters.getLogged"/>
    <v-alert v-else-if="!$store.getters.getAdmin" type="error">Este usuario no posee permisos de administrador
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
      ¡Entrada Escaneada adecuadamente!
    </v-alert>
    <v-alert
      v-model="user_already_exists_alert"
      type="error"
      close-text="Cerrar"
      color="red"
      dismissible
    >
      ¡Entrada ya escaneada con anterioridad! No puedes escanear múltiples veces la misma entrada. Si has cometido algún error, contacta a tu Delegación de Centro.
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
        <v-btn 
          color="orange darken-3" 
          dark 
          block 
          @click="hideDialog"
        >
          SALIR
        </v-btn>
      </div>
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
      isQRVisible: false,
      isHidden: false,
      isValid: undefined,
      camera: 'auto',
      result: null,
      noRearCamera: false,
      noFrontCamera: false,
      good_alert: false,
      error_alert: false,
      user_already_exists_alert: false // Specific alert that occurs if user already has a ticket
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

    // isLogged(){
    //   const token = localStorage.getItem('user-token')
    //   const token = this.$store.state.userToken

    //   const data = null
    //   console.log(token)
    //   const config = {
    //     headers: {
    //       Authorization: "Token " + token,
    //     }
    //   }
    //   console.log(config.headers.Authentication)
    //   axios.get("http://localhost:8000/api/users/auth/", config).then((response) => {
    //     let result = response.data.user == "asistencia"
    //     console.log(result)
    //     return true
    //   })
    // },
  },

  methods: {

    hideDialog()  {
        this.isQRVisible = false
    },

    launchLogout() {
      this.$store.commit("logout")
      this.$store.commit("revokeAdminAccess")
    },

    async onInit (promise) {
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
      await this.timeout(100)
      console.log(this.result)
      try{
        var data = JSON.parse(content)
        this.isValid = true
      }
      catch(e){
        this.isValid = false
      }
      // some more delay, so users have time to read the message
      if (this.isValid) {
        //this.isHidden = !this.isHidden;
        // hacer post con el ticket 
        

        axios.post("http://localhost:8000/api/editions/2022/validate_ticket/", data).then((response) => {
          console.log(response)
        })
      }
      await this.timeout(1000)
      
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