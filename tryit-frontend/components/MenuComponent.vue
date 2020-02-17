<template>
  <div class="menu" :class="{'open': isOpen}">
    <aside>
      <header class="logo">Try IT!</header>
      <ul class="primary-options">
        <li v-for="(entry, i) in menu.primary" :key="i" @click="$emit('toogleMenu')">
          <nuxt-link :to="entry.url">{{entry.text}}</nuxt-link>
        </li>
      </ul>
      <ul class="secondary-options">
        <li v-for="(entry, i) in menu.secondary" :key="i" @click="$emit('toogleMenu')">
          <nuxt-link :to="entry.url">{{entry.text}}</nuxt-link>
        </li>
      </ul>
    </aside>
    <i class="fas fa-times close" @click="$emit('toogleMenu')"></i>
    <div class="overlay" @click="$emit('toogleMenu')"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { MenuType } from "../types/components";

@Component({})
export default class MenuComponent extends Vue {
  @Prop({ type: Boolean, required: true }) isOpen!: boolean;
  @Prop({ type: Object, required: true }) menu!: MenuType;
}
</script>

<style scoped>
.menu {
  display: flex;
  flex-direction: row;
  z-index: 999;
  left: calc(-256px - var(--space-l) * 2);
  transition: var(--transition-normal) all ease;
  position: fixed;
}
.menu.open {
  left: 0;
  right: inherit;
}
.menu aside {
  z-index: 1001;
  background-color: var(--white);
  width: 256px;
  padding: var(--space-s) var(--space-l);
  height: calc(100vh - 2 * var(--space-s));
  display: flex;
  flex-direction: column;
  box-shadow: var(--box-shadow-on-light-bck);
}

.menu aside .logo {
  font-size: 18px;
  font-family: var(--roboto);
  font-weight: var(--font-bold-roboto);
  color: var(--neutral-1);
}

.menu ul {
  list-style: none;
}

.menu ul li a {
  cursor: pointer;
}

.menu ul li a:hover {
  text-decoration: underline;
}

.primary-options {
  margin-top: var(--space-m);
  flex: 1;
}
.primary-options li {
  padding: var(--space-xs) 0;
}
.primary-options li a {
  color: var(--neutral-6);
  font-family: var(--roboto);
  font-weight: var(--font-bold-roboto);
  font-size: 16px;
}

.secondary-options li {
  padding: var(--space-xxs) 0;
}

.secondary-options li a {
  color: var(--neutral-5);
  font-family: var(--roboto);
  font-weight: var(--font-regular-roboto);
  font-size: 14px;
}

.menu .close {
  margin-top: var(--space-m);
  right: calc(var(--space-l) - 11px);
  position: absolute;
  color: var(--neutral-2);
  cursor: pointer;
  z-index: 1001;
}

.overlay {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: var(--neutral-1);
  opacity: 0.2;
  left: 0;
  top: 0;
  z-index: 998;
  transition: var(--transition-normal) all ease;
  display: none;
}

.open .overlay {
  display: inherit;
  opacity: 0.2;
}

@media screen and (min-width: 800px) {
  .menu {
    flex-direction: row-reverse;
    right: calc(-256px - var(--space-l) * 2);
    transition: var(--transition-normal) all ease;
    left: initial;
    z-index: 1001;
  }

  .menu.open {
    right: 0;
  }

  aside .logo,
  .primary-options {
    display: none;
  }

  .menu .close {
    margin-top: 25px;
    margin-right: var(--space-m);
    margin-left: var(--space-m);
    right: calc(256px + var(--space-l) * 2);
    display: hidden;
    opacity: 0;
    transition: var(--transition-normal) all ease;
  }

  .menu.open .close {
    display: initial;
    opacity: 1;
  }

  .secondary-options li {
    color: var(--neutral-6);
    font-family: var(--roboto);
    font-weight: var(--font-bold-roboto);
    font-size: 16px;
    padding: var(--space-xs) 0;
  }
}
</style>
