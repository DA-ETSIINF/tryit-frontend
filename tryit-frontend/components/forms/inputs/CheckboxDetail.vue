<template>
  <div
    class="checkbox-container"
    :class="{'upm-checkbox': className === 'upm-checkbox','student-checkbox': className === 'student-checkbox', 'error': status.status === 'error'}"
  >
    <div>
      <div>
        <checkbox-input :id="id" :checked="checked" v-on:change="makeValidation"></checkbox-input>
      </div>
      <div class="checkbox-info" :style="{'margin-left': `calc(${gap})`}">
        <label :for="id" v-html="text"></label>
        <p class="small details" v-for="paragraph in details" :key="paragraph">{{paragraph}}</p>
      </div>
    </div>
    <span>{{status.statusDetail.message}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import {
  Indexes,
  Requirement,
  DynamicFormModule,
  StatusOnInput
} from "../../../types/components";
import { validate } from "../../../utils";

@Component({
  name: "checkbox-detail-input"
})
export default class CheckboxDetail extends Vue {
  @Prop({ type: String, required: true }) id!: string;
  @Prop({ type: String, required: true }) text!: string;
  @Prop({ type: Array, default: () => [] }) details!: string[];
  @Prop({ type: String, default: "" }) className!: string;
  @Prop({ type: Boolean, default: false }) checked!: boolean;
  @Prop({ type: Boolean, default: false }) needsValidation!: boolean;
  @Prop({
    default: (): StatusOnInput => {
      return { status: "ok", statusDetail: { message: "", abbreviation: "" } };
    }
  })
  readonly status!: StatusOnInput;
  @Prop({
    default: (): Indexes => {
      return { section: 0, input: 0 };
    }
  })
  readonly indexes!: Indexes;
  @Prop({ default: () => [] }) readonly validations!: Requirement[];
  @Prop({ type: String }) readonly formModule!: DynamicFormModule;
  @Prop({ type: String, default: "var(--space-m)" }) gap!: string;

  makeValidation(checked) {
    this.$emit("change", checked);
    if (this.needsValidation) {
      validate(this.validations, checked, this.indexes, this.formModule);
    }
  }
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

p.small.details {
  margin: 0;
}
</style>
