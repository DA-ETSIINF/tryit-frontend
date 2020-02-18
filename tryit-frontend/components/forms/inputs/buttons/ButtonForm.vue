<template>
  <div class="buttons-container">
    <button-component :type="'tertiary-btn'" :text="'Cancelar'"></button-component>
    <button-component :type="'primary-btn'" :text="'Enviar'"></button-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { ButtonComponent } from "../../../";

@Component({})
export default class ButtonForm extends Vue {}
</script>

<style scoped>
.buttons-container {
  margin: var(--space-l) 0;
  display: flex;
  justify-content: flex-end;
  width: calc(100% - 2 * var(--space-l));
  margin: var(--space-m) var(--space-l);
}

.buttons-container button:not(:last-child) {
  margin-right: var(--space-m);
}
@media screen and (min-width: 900px) {
  .buttons-container {
    width: 760px;
    margin: var(--space-l) auto;
  }
}
</style>
