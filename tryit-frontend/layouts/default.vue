<template>
  <v-app light class="app" :style="{ background: $vuetify.theme.themes.light.background }">
    <!-- <ViewEcts />
    <PopupTicket />
    <PopupLogin />
    <Timeline />
    <Tournaments />
    <QRReader />
    <PopupLottery />
    <EventsViewer />
    <TicketWarning />
    <FAQ />
    <LoginNoSIU />
    <Login />
    <Hackaton />-->

    <!-- Muestra el Header en pantallas grandes -->
    <HeaderComponent v-if="$vuetify.breakpoint.width >= 900" />
    <!-- En móvil muestra el HamburgerMenu -->
    <HamburgerMenu v-else />
    <main>
    <!-- <main :style="{ paddingTop: headerHeight }"> esto es para que el header y el hamburger no se sobrepongan encima del main-->
      <v-container app class="container" fluid>
        <nuxt />
        <DialButton class="dbut"></DialButton>
      </v-container>
    </main>
    <FooterComponent />
  </v-app>
</template>

<script lang="js">
import { Component, Vue } from "nuxt-property-decorator";
import HeaderComponent from "@/layouts/HeaderComponent.vue";
import FooterComponent from "@/layouts/FooterComponent.vue";
import HamburgerMenu from "@/layouts/HamburgerMenu.vue";

import {
  Map,
  Timer,
  Voluntarios,
  BusSlider,
  PopupTicket,
  PopupLogin,
  DialButton,
  Timeline,
  Tournaments,
  QRReader,
  ViewEcts,
  PopupLottery,
  History,
  EventsViewer,
  TicketWarning,
  FAQ,
  LoginNoSIU,
  Login,
  Hackaton
} from "../components"
//import { Context } from '@nuxt/types'

@Component({
  components: {
    HeaderComponent,
    FooterComponent,
    HamburgerMenu,
    /* DialButton: Components.DialButton,
    PopupTicket: Components.PopupTicket,
    PopupLogin: Components.PopupLogin,
    Timeline: Components.Timeline,
    QRReader: Components.QRReader,
    EventsViwer: Components.EventsViewer,
    FAQ: Components.FAQ, */
    Map,
    Timer,
    Voluntarios,
    BusSlider,
    ViewEcts,
    PopupTicket,
    PopupLogin,
    DialButton,
    Timeline,
    Tournaments,
    QRReader,
    PopupLottery,
    History,
    EventsViewer,
    TicketWarning,
    FAQ,
    LoginNoSIU,
    Login,
    Hackaton
  },

  computed: {
    headerHeight() {
      return this.$vuetify.breakpoint.smAndDown ? '80px' : '135px';
    }
  }
})
export default class extends Vue {}
</script>

<style>
.app {
  position: sticky;
}

main {
  flex: 1;
}
</style>
