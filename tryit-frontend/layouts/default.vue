<template>
  <v-app light class="app" :style="{ background: $vuetify.theme.themes.light.background }">
    <!-- Muestra el Header en pantallas grandes -->
    <HeaderComponent v-if="$vuetify.breakpoint.width >= 900" />
    <!-- En móvil muestra el HamburgerMenu -->
    <HamburgerMenu v-else />
    <main>
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
import * as Components from "../components";

@Component({
  components: {
    HeaderComponent,
    FooterComponent,
    HamburgerMenu,
    DialButton: Components.DialButton,
    PopupTicket: Components.PopupTicket,
    PopupLogin: Components.PopupLogin,
    Timeline: Components.Timeline,
    QRReader: Components.QRReader,
    EventsViwer: Components.EventsViewer,
    FAQ: Components.FAQ,
  }
})
export default class extends Vue {}
</script>
