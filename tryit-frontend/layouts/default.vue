<template>
  <v-app light class="app" :style="{background: $vuetify.theme.themes.light.background}">
    
      <!--<Header :menu="menu" v-on:toogleMenu="toogleOpen()"></Header>-->
      <!--<Menu :isOpen="isOpen" :menu="menu" v-on:toogleMenu="toogleOpen()"></Menu>-->
      <v-app-bar
        app
        elevate-on-scroll
        fixed
        src="/img/Imagotipo_PNG_Blanco_2.png"
        color="indigo lighten-1"
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
        <v-spacer></v-spacer>
        <!-- <v-app-bar-title class="white--text">TRY IT! 2022</v-app-bar-title> -->
        <v-spacer></v-spacer>
      </v-app-bar>
      <main>
        <v-container app class="container" fluid>
          
        <nuxt />
        <DialButton class="dbut"></DialButton>
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
    DialButton: Components.DialButton
  }
})
export default class extends Vue {
  isFormVisible: boolean =  false
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
