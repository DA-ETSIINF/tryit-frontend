<template>
    <v-footer color="secondary" class="footer">
        <v-spacer></v-spacer>
        <v-btn>&copy; {{ currentYear }}</v-btn>
        <v-spacer></v-spacer>
  
        <v-spacer></v-spacer>
        <p style="margin: 0; padding: 0" class="white--text">
          &nbsp;&nbsp;Contacto&nbsp;&nbsp;
        </p>
        <v-spacer></v-spacer>
  
        <v-spacer></v-spacer>
        <SocialNetworks variant="footer" />
        <v-spacer></v-spacer>
    </v-footer>
  </template>
  
  <script>
  import { Component, Vue } from "nuxt-property-decorator";
  import SocialNetworks from "@/layouts/SocialNetworks.vue";
  
  @Component({
  components: {
    SocialNetworks
  }
})
  export default class FooterComponent extends Vue {
    get currentYear() {
      return new Date().getFullYear();
    }
  }
  </script>
  
  <style scoped>
  /* Aquí puedes agregar estilos específicos para el footer si es necesario */
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    margin-bottom: 2px;
  }
  </style>
  