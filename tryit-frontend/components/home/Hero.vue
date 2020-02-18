<template>
  <div class="hero-container">
    <div class="img">
      <img :src="data.image" :alt="data.name" />
    </div>
    <div class="content">
      <h2>{{ data.title }}</h2>
      <h4>{{ data.description }}</h4>
      <button-component v-if="data.btn" :class="'tertiary-btn'" :text="data.btn_text"></button-component>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { ButtonComponent } from "../";
import { HeroType } from "../../types/components";

@Component({
  components: {
    ButtonComponent
  }
})
export default class Hero extends Vue {
  @Prop() data!: HeroType;
}
</script>

<style>
.hero-container {
  position: relative;
  height: 100%;
  width: 100%;
}

.img {
  background: var(--primary-3);
  width: 100%;
  height: 100%;
}

.img img {
  object-fit: cover;
  filter: opacity(0.35);
  width: 100%;
  height: 100%;
}

.hero-container .content {
  position: absolute;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  width: 100%;
  height: 100%;
}

.hero-container .content h2 {
  color: var(--neutral-10);
  font-size: 28px;
  text-align: center;
  font-weight: var(--font-bold-roboto);
}

.hero-container .content h4 {
  color: var(--neutral-10);
  font-size: 20px;
  text-align: center;
  font-weight: var(--font-regular);
  margin-top: var(--space-xs);
}

.hero-container .content button {
  margin: 0 auto;
  margin-top: var(--space-m);
  color: var(--neutral-10);
  background: transparent;
}

.hero-container .content button:hover {
  color: var(--neutral-9);
}
</style>
