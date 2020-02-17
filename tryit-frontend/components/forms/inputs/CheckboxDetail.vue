<template>
  <div class="checkbox-container" :class="className">
    <div>
      <div>
        <checkbox-input :id="id" :checked="checked" v-on:change="$emit('change', $event)"></checkbox-input>
      </div>
      <div class="checkbox-info">
        <label :for="id">{{text}}</label>
        <p class="small" v-for="paragraph in details" :key="paragraph">{{paragraph}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component({
  name: "checkbox-detail-input"
})
export default class CheckboxDetail extends Vue {
  @Prop({ type: String, required: true }) id!: string;
  @Prop({ type: String, required: true }) text!: string;
  @Prop({ type: Array, default: () => [] }) details!: string[];
  @Prop({ type: String, default: "" }) className!: string;
  @Prop({ type: Boolean, default: false }) checked!: boolean;
}
</script>

<style>
[type="checkbox"] {
  box-sizing: border-box;
  padding: 0;
}

.checkbox-container {
  margin: 0 auto;
}

.checkbox-container > div:first-child {
  display: flex;
}
.checkbox-container .checkbox-info {
  margin-left: var(--space-m);
}

.checkbox-container > div > .checkbox-info > label,
.radio-container > label > span {
  font-style: var(--roboto);
  font-weight: var(--font-bold-roboto);
  color: var(--neutral-3);
  font-size: 15px;
  cursor: pointer;
}

.checkbox-container p {
  margin-top: var(--space-xxxs);
}
</style>
