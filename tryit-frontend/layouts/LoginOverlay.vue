<template>
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title class="headline">Iniciar Sesión</v-card-title>
        <v-card-text>
          <p>Selecciona tu tipo de usuario:</p>
          <v-btn color="primary" block class="mb-3" @click="loginUPM">Usuario UPM</v-btn>
          <v-btn color="secondary" block @click="loginNoUPM">Usuario NO UPM</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  
  <script lang="ts">
  import { Component, Vue } from "nuxt-property-decorator";
  
  @Component({
    name: "LoginOverlay"
  })
  export default class LoginOverlay extends Vue {
    dialog: boolean = false;
  
    open() {
      this.dialog = true;
    }
  
    loginUPM() {
      this.$auth.loginWith("SIU");
      this.dialog = false;
    }
  
    loginNoUPM() {
      this.$nuxt.$emit("toggleLogin");
      this.dialog = false;
    }
  }
  </script>
  
  <style scoped>
  /* Estilos específicos para el overlay si es necesario */
  
  </style>
  