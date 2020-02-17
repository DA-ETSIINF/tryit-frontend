<template>
  <li :class="active">{{text}}</li>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class LabelInput extends Vue {
  @Prop({ type: Boolean, required: true }) active!: boolean;
  @Prop({ type: String, required: true }) text!: string;
  @Prop({ type: Number, required: true }) id!: number;
}
</script>

<style>
.label-selection-wrapper ul li {
  padding: var(--space-xxs) var(--space-xs);
  color: var(--primary-5);
  border: 2px solid var(--primary-5);
  border-radius: var(--border-radius-m);
  margin-bottom: var(--space-s);
  box-shadow: var(--box-shadow-on-light-bck-light);
  font-weight: var(--font-bold-roboto);
  font-family: var(--roboto);
  cursor: pointer;
  transition: var(--transition-fast);
  margin: var(--space-xxxs) var(--space-xs);
}

.label-selection-wrapper ul li.active {
  background-color: var(--primary-5);
  color: var(--neutral-10);
}

.label-selection-wrapper ul li:hover {
  transform: scale(1.05);
  border: 2px solid var(--primary-4);
  background: var(--primary-10);
  color: var(--primary-5);
}
</style>
