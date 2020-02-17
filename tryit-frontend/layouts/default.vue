<template>
  <div>
    <Header :menu="menu" v-on:toogleMenu="toogleOpen()"></Header>
    <Menu :isOpen="isOpen" :menu="menu" v-on:toogleMenu="toogleOpen()"></Menu>
    <main>
      <nuxt />
    </main>
    <Footer></Footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Components from "../components";
import { MenuType } from "../types/components";

@Component({
  components: {
    Header: Components.HeaderComponent,
    Menu: Components.MenuComponent,
    Footer: Components.FooterComponent
  }
})
export default class extends Vue {
  isOpen: boolean = false;
  menu: MenuType = {
    primary: [
      {
        text: "Entrada",
        url: "/ticket"
      },
      {
        text: "Programa",
        url: "/schedule"
      },
      {
        text: "Eventos",
        url: "/"
      },
      {
        text: "Registro voluntarios",
        url: "/volunteers"
      }
    ],
    secondary: [
      {
        text: "ECTS obtenidos",
        url: "/ects"
      },
      {
        text: "Ediciones anteriores",
        url: "/previous-editions"
      },
      {
        text: "Organizadores",
        url: "/organizers"
      },
      {
        text: "Contacto",
        url: "/contact"
      }
    ]
  };
  toogleOpen() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }
}
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}
main {
  flex: 1;
}
</style>
