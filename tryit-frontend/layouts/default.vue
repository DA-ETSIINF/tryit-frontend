<template>
  <div>
    <Header v-on:toogleMenu="toogleOpen()"></Header>
    <Menu :isOpen="isOpen" v-on:toogleMenu="toogleOpen()"></Menu>
    <main>
      <nuxt />
    </main>
    <Footer></Footer>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Components from "../components";

@Component({
  components: {
    Header: Components.HeaderComponent,
    Menu: Components.MenuComponent,
    Footer: Components.FooterComponent
  }
})
export default class extends Vue {
  isOpen: boolean = false;

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
