<template>
    <v-app-bar app elevate-on-scroll fixed src="/img/Imagotipo_PNG_Blanco_2.png" color="primary">
      <template v-slot:img="{ props }">
        <v-img v-bind="props" contain></v-img>
      </template>
  
      <!-- Espaciador para pantallas grandes -->
      <v-spacer class="d-none d-md-flex"></v-spacer>
  
      <!-- Redes Sociales en el header -->
      <v-row class="d-none d-md-flex justify-center justify-md-end w-100 mt-3 mt-md-0">
        <SocialNetworks variant="header" />
      </v-row>
  
      <!-- Extensión de la AppBar: Tabs -->
      <template v-slot:extension>
        <v-tabs fixed-tabs optional class="mt-15" background-color="primary" hide-slider dark>
          <v-tab v-if="hasTicket()" @click="launchEvViewer()">
            <v-icon left dark color="white" class="mx-3">mdi-view-list</v-icon>
            Mis charlas
          </v-tab>
          <v-tab v-if="!hasTicket()" @click="launchTicket()">
            <v-icon left dark color="white" class="mx-3">mdi-ticket-confirmation</v-icon>
            ENTRADAS
          </v-tab>
          <v-tab @click="launchTimeline()">
            <v-icon left dark color="white" class="mx-3">mdi-calendar</v-icon>
            HORARIOS
          </v-tab>
          <v-tab @click="launchTournaments()">
            <v-icon left dark color="white" class="mx-3">mdi-trophy</v-icon>
            TORNEOS
          </v-tab>
          <v-tab @click="launchFAQ()">
            <v-icon left dark color="white" class="mx-3">mdi-frequently-asked-questions</v-icon>
            FAQ
          </v-tab>
          <v-tab v-if="checkAdmin() || checkScanner()" @click="launchQRReader()">
            <v-icon left dark color="white" class="mx-3">mdi-qrcode-scan</v-icon>
            Escanear Entradas
          </v-tab>
          <v-tab v-if="checkAdmin()" @click="launchLottery()">
            <v-icon left dark color="white" class="mx-3">mdi-clover</v-icon>
            Sorteo
          </v-tab>
          <v-tab v-if="!checkLogin()" @click="menuOpen = !menuOpen">
            <v-menu v-model="menuOpen" offset-y>
              <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-icon left dark color="white" class="mx-3">mdi-login</v-icon>
                  Iniciar Sesión
                </span>
              </template>
              <v-list>
                <v-list-item @click="launchLogin()">
                  <v-list-item-title>Usuario UPM</v-list-item-title>
                </v-list-item>
                <v-list-item @click="launchLoginNoSIU()">
                  <v-list-item-title>Usuario NO UPM</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-tab>
          <v-tab v-if="checkLogin()" @click="launchLogout()">
            <v-icon left dark color="white" class="mx-3">mdi-logout</v-icon>
            LOGOUT
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </template>
  
  <script>
  import { Component, Vue } from "nuxt-property-decorator";
  import SocialNetworks from "@/layouts/SocialNetworks.vue";
  
  @Component({
  components: {
    SocialNetworks
  }
})
  export default class HeaderComponent extends Vue {
    menuOpen = false;
  
    launchTicket() {
      this.$nuxt.$emit("toggleTicketForm");
    }
    launchTimeline() {
      this.$nuxt.$emit("toggleTimeline");
    }
    launchTournaments() {
      this.$nuxt.$emit("toggleTournaments");
    }
    launchFAQ() {
      this.$nuxt.$emit("toggleFAQ");
    }
    launchLogin() {
      this.$auth.loginWith("SIU");
    }
    launchQRReader() {
      this.$nuxt.$emit("toggleQRReader");
    }
    launchLoginNoSIU() {
      this.$nuxt.$emit("toggleLogin");
    }
    launchLottery() {
      this.$nuxt.$emit("toggleLottery");
    }
    launchEvViewer() {
      this.$nuxt.$emit("toggleEvViewer");
    }
    launchLogout() {
      this.$auth.logout();
    }
    checkLogin() {
      return this.$auth.loggedIn;
    }
    checkAdmin() {
      return this.$auth.loggedIn && this.$auth.user.isadmin;
    }
    checkScanner() {
      return this.$auth.loggedIn && this.$auth.user.isscanner;
    }
    hasTicket() {
      return this.$auth.loggedIn && this.$auth.user.ticket_id !== "undefined";
    }
  }
  </script>
  