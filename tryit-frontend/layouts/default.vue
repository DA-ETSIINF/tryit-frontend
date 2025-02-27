<template>
  <v-app light class="app" :style="{ background: $vuetify.theme.themes.light.background }">
    <HeaderComponent />
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
import * as Components from "../components";

@Component({
  components: {
    HeaderComponent,
    FooterComponent,
    DialButton: Components.DialButton,
    PopupTicket: Components.PopupTicket,
    PopupLogin: Components.PopupLogin,
    Timeline: Components.Timeline,
    QRReader: Components.QRReader,
    EventsViwer: Components.EventsViewer,
    FAQ: Components.FAQ,
  }
})
export default class extends Vue {
  // Conserva aquí la lógica global que aún necesites
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
