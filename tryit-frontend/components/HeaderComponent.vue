<template>
  <header class="main-header">
    <div class="menu-container section-width" id="mobileMenu">
      <span class="logo" v-on:click="goTo('/')">Try IT!</span>
      <ul>
        <li v-for="(entry, i) in menu.primary" :key="i">
          <nuxt-link :to="entry.url">{{entry.text}}</nuxt-link>
        </li>
      </ul>
      <i class="fas fa-bars" @click="$emit('toogleMenu')"></i>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { MenuType } from "../types/components";

@Component({})
export default class HeaderComponent extends Vue {
  @Prop({ type: Object, required: true }) menu!: MenuType;

  goTo(path: string) {
    window.location.href = path; // TODO use router
  }
}
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
  cursor: pointer;
}

i {
  cursor: pointer;
}

ul {
  display: none;
}

@media screen and (min-width: 800px) {
  ul {
    list-style: none;
    display: flex;
  }
  ul li {
    margin: 0 var(--space-m);
  }

  ul li a {
    color: var(--neutral-2);
    font-family: var(--roboto);
    font-size: 14px;
    padding: var(--space-xs) 0;
    text-transform: uppercase;
    padding: var(--space-xxs) var(--space-xs);
    border-radius: var(--border-radius-m);
  }

  ul li a:hover {
    background: var(--neutral-9);
  }
}
/* TODO 
Detect when user scroll in the page so it changes the bck
.menu:not([data-scroll="0"]) {

}
*/
</style>
