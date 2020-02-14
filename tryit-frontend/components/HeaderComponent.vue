<template>
  <header class="main-header">
    <div class="menu-container section-width" id="mobileMenu">
      <span class="logo">Try IT!</span>
      <i class="fas fa-bars"></i>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class HeaderComponent extends Vue {}
</script>

<style scoped>
header.main-header {
  width: 100%;
  position: fixed;
  background: var(--neutral-10);
  box-shadow: var(--box-shadow-on-light-bck);
  z-index: 1000;
  top: 0;
}

header.main-header .menu-container {
  display: flex;
  justify-content: space-between;
  padding: var(--space-s) var(--space-l);
  color: var(--neutral-4);
  align-items: center;
  margin: 0 auto;
}

.logo {
  font-size: 18px;
  font-family: var(--roboto);
  font-weight: var(--font-bold-roboto);
}

/* TODO 
Detect when user scroll in the page so it changes the bck
.menu:not([data-scroll="0"]) {

}
*/
</style>
