<template>
  <div class="menu">
    <aside>
      <header class="logo">Try IT!</header>
      <ul class="primary-options">
        <li>Entrada</li>
        <li>Programa</li>
        <li>Talleres</li>
        <li>Eventos</li>
        <li>Escape Room</li>
        <li>Registro voluntarios</li>
      </ul>
      <ul class="secondary-options">
        <li>ECTS obtenidos</li>
        <li>Ediciones anteriores</li>
        <li>Organizadores</li>
        <li>Contacto</li>
      </ul>
    </aside>
    <i class="fas fa-times close"></i>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class MenuComponent extends Vue {}
</script>

<style scoped>
.menu {
  position: relative;
  display: flex;
  z-index: 1001;
}

.menu aside {
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

.menu ul li {
  cursor: pointer;
}

.menu ul li:hover {
  text-decoration: underline;
}

.primary-options {
  margin-top: var(--space-m);
  flex: 1;
}

.primary-options li {
  color: var(--neutral-6);
  font-family: var(--roboto);
  font-weight: var(--font-bold-roboto);
  font-size: 16px;
  padding: var(--space-xs) 0;
}

.secondary-options li {
  color: var(--neutral-5);
  font-family: var(--roboto);
  font-weight: var(--font-regular-roboto);
  font-size: 14px;
  padding: var(--space-xxs) 0;
}

.menu .close {
  margin-top: 15px;
  margin-left: var(--space-m);
  color: var(--neutral-2);
}

@media screen and (min-width: 592px) {
  .menu {
    flex-direction: row-reverse;
  }

  aside .logo,
  .primary-options {
    display: none;
  }

  .menu .close {
    margin-top: 25px;
    margin-right: var(--space-m);
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
