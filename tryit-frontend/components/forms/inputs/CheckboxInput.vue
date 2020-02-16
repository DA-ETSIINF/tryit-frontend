<template>
  <input
    :id="id"
    type="checkbox"
    :checked="checked"
    v-on:change="$emit('change', $event.target.checked)"
  />
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({})
export default class CheckboxInput extends Vue {
  @Prop({ type: String }) id!: string;
  @Prop({ type: Boolean }) checked!: boolean;

  created() {
    console.log(this.checked);
  }
}
</script>

<style>
[type="checkbox"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 1em;
  width: 1em;
  color: var(--primary-5);
  border: 1px solid var(--neutral-4);
  border-radius: 0.25rem;
  flex-shrink: 0;
  transition: all var(--transition-fast) ease-in-out;
  box-shadow: var(--box-shadow-input-inset);
  cursor: pointer;
}

[type="checkbox"]:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  border-color: transparent;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: var(--primary-6);
  box-shadow: none;
}
</style>
