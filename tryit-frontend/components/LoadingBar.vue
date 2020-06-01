<template>
  <div class="loading-bar-container">
    <div class="loading-bar-wrapper">
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class Talk extends Vue {}
</script>

<style scoped>
.loading-bar-container {
  position: absolute;
  top: 52px;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--neutral-9);
}
.loading-bar-wrapper {
  position: relative;
}
.loading-bar-wrapper div {
  animation: loading-animation 2s linear infinite;
  background: var(--primary-6);
  position: absolute;
  height: 4px;
}

@keyframes loading-animation {
  0% {
    width: 0%;
    left: 0;
  }
  50% {
    width: 50%;
    left: 25%;
  }
  100% {
    width: 0%;
    left: 100%;
  }
}
</style>
