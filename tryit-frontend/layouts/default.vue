<template>
  <div>
    <Header></Header>
    <Menu style="display:none"></Menu>
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
export default class extends Vue {}
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  margin-top: 52px;
  flex: 1;
}
</style>