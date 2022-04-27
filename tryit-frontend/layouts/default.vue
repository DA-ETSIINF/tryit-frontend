<template>
  <v-app light class="app" :style="{background: $vuetify.theme.themes.light.background}">
    
      <!--<Header :menu="menu" v-on:toogleMenu="toogleOpen()"></Header>-->
      <!--<Menu :isOpen="isOpen" :menu="menu" v-on:toogleMenu="toogleOpen()"></Menu>-->
      <v-app-bar
        app
        elevate-on-scroll
        fixed
        src="/img/Imagotipo_PNG_Blanco_2.png"
        color= "primary"
        >
        <!-- <v-img contain src="/img/Logotipo_PNG_Blanco_2.png"></v-img> -->
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            contain
          ></v-img>
        </template>
        <!-- <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template> -->
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
        <!-- <v-spacer></v-spacer> -->
        <template 
          v-slot:extension
        >
          <v-tabs
            fixed-tabs
            optional
            class="mt-15"
            background-color="primary"
            hide-slider
            dark
          >
            <v-tab
              @click="launchViewEcts()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-cash-multiple
              </v-icon>

              CONSULTA CRÉDITOS
            </v-tab>

            <v-tab
              @click="launchTicket()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-ticket-confirmation
              </v-icon>

              ENTRADAS
            </v-tab>
            <v-tab
              @click="launchTimeline()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-calendar
              </v-icon>

              HORARIOS
            </v-tab>
            <v-tab
              v-if="checkLogin()"
              @click="launchQRReader()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-qrcode-scan
              </v-icon>
              Escanear Entradas
            </v-tab>
            <v-tab
              v-if="checkLogin()"
              @click="launchLottery()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-clover
              </v-icon>
              Sorteo
            </v-tab>
            <v-tab
              v-if="!checkLogin()"
              @click="launchLogin()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-login
              </v-icon>

              Iniciar Sesión
            </v-tab>
            <v-tab
              v-else
              @click="launchLogout()"
            >
              <v-icon 
                left
                dark
                color="white"
                class="mx-3"
              >
                mdi-logout
              </v-icon>

              LOGOUT
            </v-tab>
          </v-tabs>
        </template>
      </v-app-bar>
      <main>
        <v-container app class="container" fluid>
          
        <nuxt />
        <DialButton class="dbut"></DialButton>
        </v-container>
      </main>
      <v-footer color="secondary">
        <v-spacer></v-spacer>
        <v-btn>&copy; {{ new Date().getFullYear() }}</v-btn>
        <v-spacer></v-spacer>
      </v-footer>
      
      <v-footer color="secondary">
        <v-spacer></v-spacer>
        <v-btn fab target="_blank" href="https://github.com/DA-ETSIINF/">
          <v-icon>mdi-github</v-icon>
        </v-btn>
        <p class="white--text">&nbsp;&nbsp;Contacto&nbsp;&nbsp;</p>
        <v-btn fab target="_blank" href="https://twitter.com/tryit_upm">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-footer>    
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Components from "../components";

@Component({
  components: {
    DialButton: Components.DialButton,
    PopupTicket: Components.PopupTicket,
		PopupLogin: Components.PopupLogin,
    Timeline: Components.Timeline,
		QRReader: Components.QRReader,
  }
})

export default class extends Vue {
  launchViewEcts()    {
      this.$nuxt.$emit("toggleViewEcts")
  }
  launchTicket()    {
      this.$nuxt.$emit("toggleTicketForm")
  }
  launchTimeline()    {
      this.$nuxt.$emit("toggleTimeline")
  }
  launchLogin()     {
      this.$nuxt.$emit("toggleLoginForm")
  }
  launchQRReader()    {
      this.$nuxt.$emit("toggleQRReader")
  }
  launchLottery()   {
      this.$nuxt.$emit("toggleLottery")
  }
  launchLogout() {
    this.$store.commit("logout")
    this.$store.commit("revokeAdminAccess")
  }
  checkLogin() { // @info Returns TRUE iff user is currently logged in and is admin
    return this.$store.getters.getLogged && this.$store.getters.getAdmin
  }
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

.v-toolbar__title {
  font-size: 100%!important;
}

</style>
