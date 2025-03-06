<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card>
      <v-card-title class="headline">Introduce tu correo</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="externalMail"
            label="Correo electrónico"
            :rules="emailRules"
            required
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="sendEmail">Enviar correo</v-btn>
        <v-btn text @click="dialog = false">Cancelar</v-btn>
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
      emailRules: [
        v => !!v || "El correo es obligatorio",
        v => /.+@.+\..+/.test(v) || "Introduce un correo válido"
      ]
    };
  },
  created() {
    // Escucha el evento "toggleLogin" que emite LoginOverlay
    this.$nuxt.$on("toggleLogin", () => {
      this.dialog = true;
    });
  },
  methods: {
    async sendEmail() {
      if (!this.$refs.form.validate()) return;
      try {
        const payload = { external_mail: this.externalMail };
        const res = await this.$axios.post(
          "https://tryit.upm.es/api/editions/2025/send_verification_email/",
          payload
        );
        if (res.status === 200 || res.status === 201) {
          // Puedes mostrar una alerta de éxito o resetear el formulario
          this.$emit("emailSent");
          this.dialog = false;
        }
      } catch (err) {
        // Manejo del error, por ejemplo, mostrar una alerta
        console.error("Error al enviar el correo", err);
      }
    }
  }
};
</script>
