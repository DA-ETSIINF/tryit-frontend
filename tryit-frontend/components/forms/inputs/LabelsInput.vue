<template>
  <div class="label-selection-container" :class="status">
    <div class="label-selection-wrapper">
      <h5 class="form-question">{{question}}</h5>
      <ul>
        <LabelInput
          v-for="(option, i) in options"
          :key="i.id"
          :active="option.id === selected"
          :text="option.title"
          :id="option.id"
        ></LabelInput>
      </ul>
    </div>
    <span>{{errorMsg}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { OptionSelected, InputStatus } from "../../../types/components";
@Component({})
export default class LabelsInput extends Vue {
  @Prop({ type: String, required: true }) question!: string;
  @Prop({ type: Array, required: true }) options!: OptionSelected[];
  @Prop({ type: Number, required: true }) selected!: number;
  @Prop({ type: String }) status!: InputStatus;
  @Prop({ type: String }) errorMsg!: string;
}
</script>

<style>
.label-selection-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.label-selection-wrapper ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.label-selection-container.error .label-selection-wrapper {
  background: var(--error-10);
  border-left: 5px solid var(--error-5);
  padding: var(--space-xs);
  border-radius: 0 var(--border-radius-m) var(--border-radius-m) 0;
}

.label-selection-container.error span {
  color: var(--error-2);
  font-weight: var(--font-bold-roboto);
  font-size: 13px;
}
</style>
