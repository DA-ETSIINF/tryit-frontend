<template>
  <div class="phone-margin">
    <p>
      Parece que tenemos problemas 😐 y no hemos podido cargar la información. Si el error persiste, ponte en
      <nuxt-link to="/contact">contacto con nosotros</nuxt-link>.
    </p>
    <button-component
      type="secondary-btn"
      :disabled="apiStatus.countdown > 0"
      :text="getText()"
      :loading="apiStatus.state === 'retrying'"
      @onClick="$emit('retry')"
    ></button-component>
    <div class="error" v-if="getError().length > 0 && apiStatus.state !== 'retrying'">
      <span>{{getError()}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { ApiStatus, ApiStatusError } from "../types/components";

@Component({})
export default class ApiError extends Vue {
  @Prop({ required: true }) apiStatus!: ApiStatusError;

  getText() {
    let str = "Volver a intentar";
    if (this.apiStatus.countdown > 0) {
      str += ` en ${this.apiStatus.countdown} segundo${
        this.apiStatus.countdown === 1 ? "" : "s"
      }`;
    }
    return str;
  }

  getError() {
    if (!this.apiStatus.error.response) {
      return "No se ha podido conectar con el servidor";
    }
    return this.apiStatus.error.message;
  }
}
</script>

<style scoped>
.error {
  margin-top: var(--space-m);
  padding: var(--space-xxs) var(--space-xs);
  background: var(--error-10);
  color: var(--error-1);
  border-left: 4px solid var(--error-5);
  border-radius: var(--border-radius-s);
}
</style>
