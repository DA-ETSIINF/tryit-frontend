<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card>
      <v-card-title class="headline">Introduce tu correo</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="sendEmail">
          <v-text-field
            v-model="externalMail"
            label="Correo electrónico"
            :rules="emailRules"
            required
          />
        </v-form>
        <!-- Mensaje de error -->
        <v-alert
          v-if="errorMessage"
          type="error"
          dismissible
          @input="errorMessage = ''"
        >
          {{ errorMessage }}
        </v-alert>
        <!-- Mensaje de confirmación -->
        <v-alert
          v-if="successMessage"
          type="success"
          dismissible
          @input="successMessage = ''"
        >
          {{ successMessage }}
        </v-alert>
         <!-- Descripción explicando el motivo -->
         <p>
          Ingresa tu correo electrónico para que podamos enviarte tu entrada. 
        </p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="sendEmail">Enviar correo</v-btn>
        <v-btn text @click="closeDialog">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      externalMail: "",
      errorMessage: "",
      successMessage: "",
      emailRules: [
        v => !!v || "El correo es obligatorio",
        v => /.+@.+\..+/.test(v) || "Introduce un correo válido"
      ]
    };
  },
  created() {
    // Al abrir el diálogo se resetean los mensajes y el formulario
    this.$nuxt.$on("toggleLogin", () => {
      this.dialog = true;
      this.resetForm();
    });
  },
  methods: {
    async sendEmail() {
      // Limpiar mensajes previos
      this.errorMessage = "";
      this.successMessage = "";
      if (!this.$refs.form.validate()) return;
      try {
        const payload = { external_mail: this.externalMail };
        const res = await this.$axios.post(
          `https://tryit.upm.es/api/editions/${process.env.edition}/send_verification_email/`,
          payload
        );
        if (res.status === 200 || res.status === 201) {
          // Mostrar mensaje de confirmación sin cerrar el diálogo
          this.successMessage = "Correo enviado correctamente.";
        }
      } catch (err) {
        console.error("Error al enviar el correo", err);
        if (err.response && err.response.data && err.response.data.message) {
          this.errorMessage = err.response.data.message;
        }
        else if(err.response.data == "Ya existe el usuario"){
          this.errorMessage =
            "Ya existe un usuario con este correo. Si has perdido tu entrada por favor contacta con incidencias.tryit@upm.es .";
        } else {
          this.errorMessage =
            "Los correos @upm.es no pueden ser enviados desde esta plataforma. Por favor, introduce un correo personal o pruebe con Usuario UPM.";
        }
      }
    },
    closeDialog() {
      this.dialog = false;
      this.resetForm();
    },
    resetForm() {
      this.externalMail = "";
      this.errorMessage = "";
      this.successMessage = "";
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    }
  }
};
</script>
