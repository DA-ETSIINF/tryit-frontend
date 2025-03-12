<template>
  <div>
    <!-- Header del menú hamburguesa similar al HeaderComponent -->
    <v-app-bar app elevate-on-scroll fixed color="primary" height="90px">
      <!-- Contenedor principal con flexbox -->
      <div class="d-flex align-center justify-space-between" style="width: 100%;">
        <!-- Sección izquierda: Botón del menú -->
        <div class="d-flex align-center">
          <!-- Botón para abrir/cerrar el menú (visible solo en móvil) -->
          <v-btn icon @click="toggleDrawer" class="d-md-none" id="icon-adjust">
            <v-icon color="white" size="35px">
              mdi-menu
            </v-icon>
          </v-btn>
        </div>

        <!-- Sección central: Logotipo -->
        <div class="d-flex justify-center align-center flex-grow-1">
          <a href="">
            <v-img class="logo" src="/img/Imagotipo_PNG_Blanco_2.png"></v-img>
          </a>
        </div>

        <!-- Sección derecha: Espaciador para mantener el logotipo centrado -->
        <div class="d-flex align-center" style="width: 35px;">
          <!-- Este div ocupa el mismo espacio que el botón del menú para centrar el logotipo -->
        </div>
      </div>    
    </v-app-bar>

    <!-- Sidebar de navegación (drawer) -->
    <v-navigation-drawer v-model="drawer" temporary left fixed :width="drawerWidth" attach="body" class="primary"
      style="overflow-y: auto; z-index: 3000;" transition="navigation-drawer-transition">
      <!-- Encabezado del drawer: botón de cerrar y logo -->
      <v-list-item>
        <v-btn icon @click="toggleDrawer" class="d-md-none" id="icon-adjust">
          <v-icon color="white" size="35px">mdi-close</v-icon>
        </v-btn>
        <v-img src="/img/Imagotipo_PNG_Blanco_2.png" contain height="80" class="ml-2"></v-img>
      </v-list-item>
      <v-divider></v-divider>

      <!-- Menú de navegación -->
      <v-list dense>
        <v-list-item v-if="hasTicket()" @click="handleClick(launchEvViewer)">
          <v-list-item-action>
            <v-icon color="white" size="30px">mdi-view-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="menu-title">Mis charlas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-else @click="handleClick(launchTicket)">
          <v-list-item-action>
            <v-icon color="white" size="30px">mdi-ticket-confirmation</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="menu-title">Entradas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="handleClick(launchTimeline)">
          <v-list-item-action>
            <v-icon color="white" size="30px">mdi-calendar</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="menu-title">Horarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="handleClick(launchHackaton)">
          <v-list-item-action>
            <v-icon color="white" size="30px">mdi-trophy</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="menu-title">HACK IT!</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="handleClick(launchFAQ)">
          <v-list-item-action>
            <v-icon color="white" size="30px">mdi-frequently-asked-questions</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="menu-title">FAQ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="checkAdmin() || checkScanner()" @click="handleClick(launchQRReader)">
          <v-list-item-action>
            <v-icon color="white" size="30px">mdi-qrcode-scan</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="menu-title">Escanear Entradas</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="checkAdmin()" @click="handleClick(launchLottery)">
          <v-list-item-action>
            <v-icon color="white" size="30px">mdi-clover</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="menu-title">Sorteo</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="!checkLogin()" @click="handleClick(openLoginOverlay)">
          <v-list-item-action>
            <v-icon color="white" size="30px">mdi-login</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="menu-title">Iniciar Sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="checkLogin()" @click="handleClick(launchLogout)">
          <v-list-item-action>
            <v-icon color="white" size="30px">mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="menu-title">Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- Redes Sociales en la parte inferior centrado -->

      <hr color="#0071bc" />

      <div class="social-container">
        <SocialNetworks variant="header" />
      </div>

    </v-navigation-drawer>

    <!-- Componente LoginOverlay para iniciar sesión -->
    <LoginOverlay ref="loginOverlay" />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import SocialNetworks from "@/layouts/SocialNetworks.vue";
import LoginOverlay from "@/layouts/LoginOverlay.vue";

@Component({
  components: {
    SocialNetworks,
    LoginOverlay
  }
})
export default class HamburgerMenu extends Vue {
  drawer = false;
  drawerWidth = "20em";

  toggleDrawer() {
    this.drawer = !this.drawer;
  }

  // Ejecuta la acción y cierra el drawer
  handleClick(fn: Function) {
    fn.call(this);
    this.drawer = false;
  }

  launchTicket() {
    this.$nuxt.$emit("toggleTicketForm");
  }
  launchTimeline() {
    this.$nuxt.$emit("toggleTimeline");
  }
  launchTournaments() {
    this.$nuxt.$emit("toggleTournaments");
  }
  launchHackaton() {
    this.$nuxt.$emit("toggleHackaton");
  }
  launchFAQ() {
    this.$nuxt.$emit("toggleFAQ");
  }
  launchQRReader() {
    this.$nuxt.$emit("toggleQRReader");
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
    return this.$auth.loggedIn && this.$auth.user && this.$auth.user.isadmin;
  }
  checkScanner() {
    return this.$auth.loggedIn && this.$auth.user && this.$auth.user.isscanner;
  }
  hasTicket() {
    return this.$auth.loggedIn && this.$auth.user && this.$auth.user.ticket_id !== "undefined";
  }
  openLoginOverlay() {
    (this.$refs.loginOverlay as any).open();
  }
}
</script>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  height: 50px;
}

.logo{
  height: auto;
  width: 200px;
}

.v-navigation-drawer.primary {
  background-color: #1976D2;
  color: white;
}

.v-navigation-drawer__scrim {
  z-index: 1500 !important;
}

::v-deep .menu-title {
  font-size: 14px !important;
  color: white;
  font-family: var(--lovelo-font);
}

.social-container {
  margin-top: auto;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#icon-adjust {
  margin-left: 0px; /* sin esto se ve raro, no entiendo nada */
}

</style>
