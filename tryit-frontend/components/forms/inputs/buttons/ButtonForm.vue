<template>
  <div class="buttons-container">
    <button-component :type="'tertiary-btn'" @onClick="goTo('/')" :text="'Cancelar'"></button-component>
    <button-component
      :type="'primary-btn'"
      @onClick="$emit('send')"
      :disabled="disabled"
      :text="'Enviar'"
    ></button-component>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { ButtonComponent } from "../../../";

@Component({})
export default class ButtonForm extends Vue {
  @Prop({ default: false }) readonly disabled!: boolean;

  goTo(path: string) {
    window.location.href = path; // TODO use router
  }
}
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
