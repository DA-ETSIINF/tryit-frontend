<template>
  <v-dialog v-model="isQRVisible" max-width="600px">
    <v-alert v-if="!this.$auth.loggedIn || !this.$auth.user.isscanner" type="error">
      Este usuario no posee permisos de administrador
    </v-alert>

    <v-card v-else>
      <!-- ── DEBUG por si sirve o se rompe algo ── -->
      <!-- <v-expansion-panels flat class="mb-2">
        <v-expansion-panel>
          <v-expansion-panel-header color="grey lighten-3">
            <span><v-icon small left>mdi-bug</v-icon>Debug info</span>
          </v-expansion-panel-header>
          <v-expansion-panel-content color="grey lighten-4">
            <pre style="font-size:11px; white-space: pre-wrap;">
isscanner: {{ $auth.user.isscanner }}
can_scan_volunteers: {{ $auth.user.can_scan_volunteers }}
isadmin: {{ $auth.user.isadmin }}
scanMode: {{ scanMode }}
eventValue: {{ eventValue }}
lastScanResult: {{ lastScanResult }}
            </pre>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels> -->

      <!-- ── ALERTAS ENTRADA ── -->
      <v-alert v-model="good_alert" type="success" color="green" close-text="Cerrar" dismissible>
        ¡Entrada validada adecuadamente!
      </v-alert>
      <v-alert v-model="user_already_exists_alert" type="error" color="red" close-text="Cerrar" dismissible>
        ¡Entrada ya escaneada con anterioridad!
      </v-alert>
      <v-alert v-model="error_alert" type="error" color="red" close-text="Cerrar" dismissible>
        Error al escanear la entrada. Habla con la Delegación de Alumnos de Centro.
      </v-alert>
      <v-alert v-model="no_event_alert" type="warning" color="orange" close-text="Cerrar" dismissible>
        ¡Debes seleccionar un evento antes de escanear una entrada!
      </v-alert>
      <v-alert v-model="overlap_alert" type="warning" color="orange" close-text="Cerrar" dismissible>
        ¡Ya te has registrado a un evento que se solapa con este!
      </v-alert>

      <!-- ── ALERTAS VOLUNTARIO ── -->
      <v-alert v-model="volunteer_shift_started_alert" type="success" color="green" close-text="Cerrar" dismissible>
        ✅ Turno de voluntario <strong>iniciado</strong> correctamente.
      </v-alert>
      <v-alert v-model="volunteer_shift_closed_alert" type="info" color="blue" close-text="Cerrar" dismissible>
        🔒 Turno de voluntario <strong>cerrado</strong> correctamente.
      </v-alert>
      <v-alert v-model="volunteer_not_found_alert" type="error" color="red" close-text="Cerrar" dismissible>
        El usuario escaneado no está registrado como voluntario.
      </v-alert>
      <v-alert v-model="volunteer_error_alert" type="error" color="red" close-text="Cerrar" dismissible>
        Error al fichar al voluntario.
      </v-alert>

      <!-- ══════════════════════════════════════════════════
           SELECTOR DE MODO — solo para can_scan_volunteers
           Bloquea el escáner hasta que se elija un modo
      ══════════════════════════════════════════════════ -->
      <template v-if="$auth.user.can_scan_volunteers">
        <v-row justify="center" class="mt-4 mb-1">
          <v-col cols="auto">
            <div class="text-subtitle-1 text-center font-weight-bold grey--text text--darken-1">
              ¿Qué quieres hacer?
            </div>
          </v-col>
        </v-row>
        <v-row justify="center" class="mb-4" no-gutters>
          <v-col cols="5" class="px-2">
            <v-card
              outlined
              :class="['mode-card', scanMode === 'entrada' ? 'mode-card--active-green' : '']"
              @click="scanMode = 'entrada'"
              style="cursor:pointer"
            >
              <v-card-text class="text-center pa-4">
                <v-icon size="48" :color="scanMode === 'entrada' ? 'green darken-1' : 'grey'">
                  mdi-ticket-confirmation
                </v-icon>
                <div class="mt-2 font-weight-bold" :class="scanMode === 'entrada' ? 'green--text darken-1' : 'grey--text'">
                  Escanear<br>Entradas
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="5" class="px-2">
            <v-card
              outlined
              :class="['mode-card', scanMode === 'voluntario' ? 'mode-card--active-blue' : '']"
              @click="scanMode = 'voluntario'"
              style="cursor:pointer"
            >
              <v-card-text class="text-center pa-4">
                <v-icon size="48" :color="scanMode === 'voluntario' ? 'blue darken-1' : 'grey'">
                  mdi-account-clock
                </v-icon>
                <div class="mt-2 font-weight-bold" :class="scanMode === 'voluntario' ? 'blue--text darken-1' : 'grey--text'">
                  Fichar<br>Voluntario
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-divider class="mb-3" />

        <!-- Banner del modo activo -->
        <v-row justify="center" class="mb-3" v-if="scanMode">
          <v-col cols="auto">
            <v-chip
              large
              :color="scanMode === 'entrada' ? 'green' : 'blue'"
              dark
              label
            >
              <v-icon left>{{ scanMode === 'entrada' ? 'mdi-ticket-confirmation' : 'mdi-account-clock' }}</v-icon>
              Modo activo: <strong class="ml-1">{{ scanMode === 'entrada' ? 'Escanear Entradas' : 'Fichar Voluntario' }}</strong>
            </v-chip>
          </v-col>
        </v-row>
      </template>

      <!-- ── SELECTOR EVENTO (solo modo entrada) ── -->
      <v-row v-if="scanMode === 'entrada'" align="center" justify="space-around" class="mt-2">
        <v-col cols="12" sm="6">Selección de Eventos:</v-col>
        <v-col cols="12" sm="6">
          <v-autocomplete
            v-model="eventValue"
            :items="eventNames"
            append-outer-icon="mdi-calendar"
            label="Eventos"
            hint="Elige el evento para el que vas a registrar la asistencia"
            persistent-hint
            auto-select-first
            required
          />
        </v-col>
      </v-row>

      <!-- ── BOTÓN + CÁMARA — bloqueado si can_scan_volunteers y no hay modo ── -->
      <div id="QRButton" class="mt-2">
        <v-tooltip top :disabled="!!scanMode">
          <template #activator="{ on }">
            <div v-on="on">
              <v-btn
                color="secondary"
                block
                :disabled="$auth.user.can_scan_volunteers && !scanMode"
                @click="isHidden = !isHidden"
              >
                <v-icon left>mdi-qrcode-scan</v-icon>
                Escanear QR
              </v-btn>
            </div>
          </template>
          <span>Selecciona un modo antes de escanear</span>
        </v-tooltip>

        <div v-if="isHidden">
          <qrcode-stream :camera="camera" @decode="onDecode" @init="onInit">
            <div v-if="validationSuccess" class="validation-success">
              Formato de ticket válido, esperando confirmación...
            </div>
            <div v-if="validationFailure" class="validation-failure">
              Formato de ticket inválido
            </div>
            <div v-if="validationPending" class="validation-pending">
              Validando ticket...
            </div>
            <v-btn color="accent" block @click="switchCamera">
              <v-icon>mdi-camera</v-icon>
            </v-btn>
          </qrcode-stream>
        </div>
      </div>
    </v-card>

    <v-card>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn dark rounded x-large color="close" @click="hideDialog">
          <v-icon left dark x-large color="white" class="mx-3">mdi-close</v-icon>
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      // null = sin elegir (bloquea escáner para can_scan_volunteers)
      // 'entrada' | 'voluntario'
      scanMode: null,
      eventValue: [],
      events: [],
      eventIds: [],
      eventNames: [],
      isQRVisible: false,
      isHidden: true,
      isValid: undefined,
      camera: 'auto',
      result: null,
      noRearCamera: false,
      noFrontCamera: false,
      lastScanResult: null, // debug
      // Alertas entrada
      good_alert: false,
      error_alert: false,
      overlap_alert: false,
      user_already_exists_alert: false,
      no_event_alert: false,
      // Alertas voluntario
      volunteer_shift_started_alert: false,
      volunteer_shift_closed_alert: false,
      volunteer_not_found_alert: false,
      volunteer_error_alert: false,
    }
  },

  computed: {
    validationPending() {
      return this.isValid === undefined && this.camera === 'off'
    },
    validationSuccess() {
      return this.isValid === true
    },
    validationFailure() {
      return this.isValid === false
    },
  },

  watch: {
    // Al abrir el diálogo, resetear modo si tiene can_scan_volunteers
    isQRVisible(val) {
      if (val && this.$auth.user.can_scan_volunteers) {
        this.scanMode = null
      } else if (val) {
        // Si no tiene can_scan_volunteers, directamente modo entrada
        this.scanMode = 'entrada'
      }
    },
  },

  methods: {
    hideDialog() {
      this.isQRVisible = false
    },

    clearAllAlerts() {
      this.good_alert = false
      this.error_alert = false
      this.overlap_alert = false
      this.user_already_exists_alert = false
      this.no_event_alert = false
      this.volunteer_shift_started_alert = false
      this.volunteer_shift_closed_alert = false
      this.volunteer_not_found_alert = false
      this.volunteer_error_alert = false
    },

    async onInit(promise) {
      const date = new Date()
      const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

      try {
        this.days = await this.$axios.$get(`${process.env.api}/api/editions/${process.env.edition}/schedule`)
        for (var post of this.days) {
          for (var ev of post.events) {
            if (post.day == today) {
              this.eventNames.push(ev.name)
              this.eventIds.push(ev.id)
            }
          }
        }
      } catch (e) {
        console.error('[DEBUG] Error cargando schedule:', e)
      }

      try {
        await promise
      } catch (error) {
        const triedFrontCamera = this.camera === 'front'
        const triedRearCamera = this.camera === 'rear'
        const cameraMissingError = error.name === 'OverconstrainedError'
        if (triedRearCamera && cameraMissingError) this.noRearCamera = true
        if (triedFrontCamera && cameraMissingError) this.noFrontCamera = true
        console.error('[DEBUG] Camera error:', error)
      }
      this.resetValidationState()
    },

    resetValidationState() {
      this.isValid = undefined
    },

    switchCamera() {
      this.camera = this.camera === 'front' ? 'rear' : 'front'
    },

    async onDecode(content) {
      this.result = content
      //this.turnCameraOff()
      //await this.timeout(500)

      let id
      try {
        id = JSON.parse(content).id
        this.isValid = true
      } catch (e) {
        this.isValid = false
      }

      if (this.isValid) {
        if (this.scanMode === 'voluntario') {
          await this.scanVolunteer(id)
        } else {
          await this.scanEntrada(id)
        }
      }

      //await this.timeout(300)
      //this.turnCameraOn()
      await this.timeout(1500)
      this.clearAllAlerts()
    },

    async scanEntrada(id) {
      if (!this.eventValue || this.eventValue.length === 0) {
        this.no_event_alert = true
        return
      }
      const eventId = this.eventIds[this.eventNames.indexOf(this.eventValue)]

      const payload = { id, event: eventId };
      try {
        const response = await this.$axios.post(
          `${process.env.api}/api/editions/${process.env.edition}/validate_ticket/`,
          payload
        )
        this.lastScanResult = `entrada → ${response.status}`
        this.clearAllAlerts()
        if (response.status === 200) {
          this.good_alert = true
          this.$nuxt.$emit('logged')
        } else if (response.status === 201 || response.status === 204) {
          this.user_already_exists_alert = true
        } else {
          this.error_alert = true
        }
      } catch (e) {
        this.lastScanResult = `entrada → ERROR ${e.response?.status}: ${JSON.stringify(e.response?.data)}`
        this.clearAllAlerts()
        this.error_alert = true
      }
    },

    async scanVolunteer(id) {
      const payload = { id }
      try {
        const response = await this.$axios.post(
          `${process.env.api}/api/editions/${process.env.edition}/scan_volunteer/`,
          payload
        )
        this.lastScanResult = `voluntario → ${response.status}: ${response.data}`
        this.clearAllAlerts()
        if (response.status === 200) {
          if (response.data === 'New shift started') {
            this.volunteer_shift_started_alert = true
          } else if (response.data === 'Shift closed') {
            this.volunteer_shift_closed_alert = true
          }
        } else {
          this.volunteer_error_alert = true
        }
      } catch (e) {
        this.lastScanResult = `voluntario → ERROR ${e.response?.status}: ${JSON.stringify(e.response?.data)}`
        this.clearAllAlerts()
        if (e.response?.status === 400 && e.response?.data?.includes?.('not registered as a volunteer')) {
          this.volunteer_not_found_alert = true
        } else {
          this.volunteer_error_alert = true
        }
      }
    },

    turnCameraOn() { this.camera = 'auto' },
    turnCameraOff() { this.camera = 'off' },
    timeout(ms) {
      return new Promise(resolve => window.setTimeout(resolve, ms))
    },
  },

  created() {
    this.$nuxt.$on('toggleQRReader', () => {
      this.isQRVisible = !this.isQRVisible
    })
    // Si no tiene can_scan_volunteers, siempre modo entrada
    if (!this.$auth.user?.can_scan_volunteers) {
      this.scanMode = 'entrada'
    }
  },
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
.validation-success { color: green; }
.validation-failure  { color: red;   }

.mode-card {
  border: 2px solid #e0e0e0 !important;
  border-radius: 12px !important;
  transition: all 0.2s ease;
}
.mode-card:hover {
  border-color: #9e9e9e !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important;
}
.mode-card--active-green {
  border-color: #388e3c !important;
  background-color: #f1f8f1 !important;
  box-shadow: 0 2px 10px rgba(56,142,60,0.25) !important;
}
.mode-card--active-blue {
  border-color: #1565c0 !important;
  background-color: #e8f0fe !important;
  box-shadow: 0 2px 10px rgba(21,101,192,0.25) !important;
}
</style>
