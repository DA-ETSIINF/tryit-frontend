<template>
  <v-app-bar app elevate-on-scroll fixed src="/img/Imagotipo_PNG_Blanco_2.png" color="primary">
    <template v-slot:img="{ props }" >
      <v-img v-bind="props" contain></v-img>
    </template>

    <!-- Si no es mobile, mostramos el spacer y las redes sociales -->
    <v-row class="d-none d-md-flex justify-center justify-md-end ">
      <SocialNetworks variant="header" />
    </v-row>

    <!-- Extensión: Si es mobile, muestra el HamburgerMenu, de lo contrario los tabs -->
    <template v-slot:extension>
      <HamburgerMenu v-if="isMobile" />
      <v-tabs v-else fixed-tabs optional class="mt-15" background-color="primary" hide-slider dark>
        <v-tab v-if="hasTicket()" @click="launchEvViewer">
          <v-icon left dark color="white" class="mx-3">mdi-view-list</v-icon>
          Mis charlas
        </v-tab>
        <v-tab v-if="!hasTicket()" @click="launchTicket">
          <v-icon left dark color="white" class="mx-3">mdi-ticket-confirmation</v-icon>
          ENTRADAS
        </v-tab>
        <v-tab @click="launchTimeline">
          <v-icon left dark color="white" class="mx-3">mdi-calendar</v-icon>
          HORARIOS
        </v-tab>
        <v-tab @click="launchHackaton">
          <v-icon left dark color="white" class="mx-3">mdi-trophy</v-icon>
          HACK IT!
        </v-tab>
        <v-tab @click="launchFAQ">
          <v-icon left dark color="white" class="mx-3">mdi-frequently-asked-questions</v-icon>
          FAQ
        </v-tab>
        <!-- Nueva sección: Mesas Redondas -->
        <v-tab @click="launchMesasRedondas">
          <v-icon left dark color="white" class="mx-3">mdi-table</v-icon>
          Mesas Redondas
        </v-tab>
        <v-tab v-if="checkAdmin() || checkScanner()" @click="launchQRReader">
          <v-icon left dark color="white" class="mx-3">mdi-qrcode-scan</v-icon>
          Escanear Entradas
        </v-tab>
        <v-tab v-if="checkAdmin()" @click="launchLottery">
          <v-icon left dark color="white" class="mx-3">mdi-clover</v-icon>
          Sorteo
        </v-tab>
        <v-tab v-if="!checkLogin()" @click="openLoginOverlay">
          <v-icon left dark color="white" class="mx-3">mdi-login</v-icon>
          Iniciar Sesión
        </v-tab>
        <!-- Se integra el LoginOverlay para que lo abra el método openLoginOverlay -->
        <LoginOverlay ref="loginOverlay" />
        <v-tab v-if="checkLogin()" @click="launchLogout">
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
import LoginOverlay from "@/layouts/LoginOverlay.vue";

@Component({
  components: {
    SocialNetworks,
    LoginOverlay,
  }
})
export default class HeaderComponent extends Vue {
  // Propiedad computada que retorna true si el ancho es menor a 900px
  get isMobile() {
    return this.$vuetify.breakpoint.width < 900;
  }

  openLoginOverlay() {
    this.$refs.loginOverlay.open();
  }
  launchTicket() {
    this.$nuxt.$emit("toggleTicketForm");
  }
  launchTimeline() {
    this.$nuxt.$emit("toggleTimeline");
  }
  launchHackaton() {
    this.$nuxt.$emit("toggleHackaton");
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
  hasTicket() {
    return this.$auth.loggedIn && this.$auth.user.ticket_id !== "undefined";
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
  // Método para activar la sección de Mesas Redondas
  launchMesasRedondas() {
    this.$nuxt.$emit("toggleMesasRedondas");
  }
}
</script>
