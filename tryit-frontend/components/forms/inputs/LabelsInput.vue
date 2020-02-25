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
          v-on:change="changedOption"
        ></LabelInput>
      </ul>
    </div>
    <span>{{errorMsg}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import {
  OptionSelected,
  InputStatus,
  Indexes,
  Requirement,
  DynamicFormModule
} from "../../../types/components";
import { validate, emitInput } from "../../../utils";

@Component({})
export default class LabelsInput extends Vue {
  @Prop({ type: String, required: true }) readonly question!: string;
  @Prop({ type: Array, required: true }) readonly options!: OptionSelected[];
  @Prop({ required: true }) readonly selected!: number | null;
  @Prop({ type: Object }) readonly status!: InputStatus;
  @Prop({ type: String }) readonly errorMsg!: string;
  @Prop({
    default: (): Indexes => {
      return { section: 0, input: 0 };
    }
  })
  readonly indexes!: Indexes;
  @Prop({ default: () => [] }) readonly validations!: Requirement[];
  @Prop({ default: "" }) readonly formModule!: DynamicFormModule;

  changedOption(id: string) {
    emitInput(this.formModule, {
      key: "selected",
      value: id,
      indexes: this.indexes
    });
    this.makeValidation(id);
  }

  makeValidation(id: string) {
    validate(this.validations, [id], this.indexes, this.formModule, 1);
  }
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
