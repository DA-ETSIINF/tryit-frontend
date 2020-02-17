<template>
  <div class="contact-container">
    <p>{{text}}</p>
    <div class="buttons">
      <button-component :text="phone" :type="'secondary-btn'"></button-component>
      <button-component :text="email" :type="'secondary-btn'"></button-component>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class ContactComponent extends Vue {
  @Prop({ type: String, required: true }) text!: string;
  @Prop({ type: String, required: true }) phone!: string;
  @Prop({ type: String, required: true }) email!: string;
}
</script>

<style scoped>
.contact-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: var(--space-l);
}

.contact-container p {
  text-align: left;
}

.contact-container .buttons {
  margin: 0 auto;
}

.contact-container .buttons button {
  margin: var(--space-xs) var(--space-xxs);
  background: var(--white);
}

.contact-container .buttons button:hover {
  background: var(--neutral-10);
}
</style>
