<template>
  <div class="loading-icon-container" :class="{hide}">
    <div class="loading-icon-wrapper">
      <div></div>
      <div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { SponsorCategory } from "../types/api";

@Component({})
export default class LoadingAnimation extends Vue {
  @Prop({ type: Boolean, default: true }) hide!: boolean;
}
</script>

<style>
@keyframes loading-animation {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.loading-icon-wrapper div {
  box-sizing: border-box !important;
}
.loading-icon-wrapper > div {
  position: absolute;
  width: 18px;
  height: 18px;
  top: 3.5px;
  left: 3.5px;
  border-radius: 50%;
  border: 2px solid #000;
  border-color: var(--primary-5) transparent var(--primary-5) transparent;
  animation: loading-animation 1s linear infinite;
}
.loading-icon-wrapper > div:nth-child(2) {
  border-color: transparent;
}
.loading-icon-wrapper > div:nth-child(2) div {
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(45deg);
}
.loading-icon-wrapper > div:nth-child(2) div:before,
.loading-icon-wrapper > div:nth-child(2) div:after {
  content: "";
  display: block;
  position: absolute;
  width: 2px;
  height: 2px;
  top: -2px;
  left: 6px;
  background: var(--primary-5);
  border-radius: 50%;
  box-shadow: 0 16px 0 0 var(--primary-5);
}
.loading-icon-wrapper > div:nth-child(2) div:after {
  left: -2px;
  top: 6px;
  box-shadow: 16px 0 0 0 var(--primary-5);
}
.loading-icon-container {
  width: 25px;
  height: 25px;
  display: inline-block;
  overflow: hidden;
  position: relative;
  margin-left: var(--space-s);
  transition: 0.3s all ease;
}

.loading-icon-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
}
.loading-icon-wrapper div {
  box-sizing: content-box;
}

.loading-icon-container.hide {
  margin-left: 0;
  width: 0;
}

.loading-icon-container.hide .loading-icon-wrapper {
  position: absolute;
}
</style>
