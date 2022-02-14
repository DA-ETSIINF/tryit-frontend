<template>
  <v-app light class="app" :style="{background: $vuetify.theme.themes.light.background}">
    
      <!--<Header :menu="menu" v-on:toogleMenu="toogleOpen()"></Header>-->
      <!--<Menu :isOpen="isOpen" :menu="menu" v-on:toogleMenu="toogleOpen()"></Menu>-->
      <v-app-bar
        app
        elevate-on-scroll
        fixed
        color="indigo lighten-1"
        
        fade-img-on-scroll
        shrink-on-scroll
        src="/img/welcome.jpg"
        >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
          ></v-img>
        </template>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-app-bar-title class="white--text">TRY IT! 2022</v-app-bar-title>

        <v-spacer></v-spacer>

        
      </v-app-bar>
      
      
    
      <main>
        <v-container app class="container" fluid>
        <nuxt />
        </v-container>
      </main>
      <v-footer color="indigo lighten-1">
        <v-spacer></v-spacer>
        <v-btn>&copy; {{ new Date().getFullYear() }}</v-btn>
        <v-spacer></v-spacer>
      </v-footer>
      
      <v-footer color="indigo lighten-1">
        <v-spacer></v-spacer>
        <v-btn fab target="_blank" href="https://github.com/DA-ETSIINF/">
          <v-icon>mdi-github</v-icon>
        </v-btn>
        <p class="white--text">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contacto&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <v-btn fab target="_blank" href="https://twitter.com/tryit_upm">
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-footer>
      <!--<Footer></Footer>-->
    
    
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Components from "../components";
import { MenuType } from "../types/components";

@Component({
  components: {
    Menu: Components.MenuComponent,
  }
})
export default class extends Vue {
  isOpen: boolean = false;
  menu: MenuType = {
    primary: [
      {
        text: "Inicio",
        url: "/"
      },
      // {
      //   text: "Entrada",
      //   url: "/ticket"
      // },
      // {
      //   text: "Programa",
      //   url: "/schedule"
      // },
      // {
      //   text: "Eventos",
      //   url: "/"
      // },
      // {
      //   text: "Registro voluntarios",
      //   url: "/volunteers"
      // }
    ],
    secondary: [
      // {
      //   text: "ECTS obtenidos",
      //   url: "/ects"
      // },
      // {
      //   text: "Ediciones anteriores",
      //   url: "/last-editions"
      // },
      // {
      //   text: "Organizadores",
      //   url: "/organizers"
      // },
      {
        text: "Contacto",
        url: "/contact"
      }
    ]
  };
  toogleOpen() {
    this.isOpen = !this.isOpen;
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
