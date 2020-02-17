<template>
  <div class="form-container">
    <form-section
      v-for="(section, i) in this.form.sections"
      :key="`section-${i}`"
      :section="section"
    >
      <div v-for="(input, j) in section.inputs" :key="`input-${i}-${j}`">
        <text-input
          v-if="input.tag === 'text-input'"
          :helperText="input.properties.helperText"
          :placeholder="input.properties.placeholder"
          :value="input.properties.value"
          :isDisabled="input.properties.isDisabled"
          :hideText="input.properties.hideText"
          :status="input.properties.status"
          :noBorder="input.properties.noBorder"
          :noShadows="input.properties.noShadows"
          :leaveSpaceRight="input.properties.leaveSpaceRight"
        ></text-input>
        <student-input
          v-if="input.tag === 'student-input'"
          :isStudent="input.properties.isStudent"
          :isUpmStudent="input.properties.isUpmStudent"
        ></student-input>
        <select-input
          v-if="input.tag === 'select-input'"
          :title="input.question"
          :options="input.properties.options"
          :optionSelected="input.properties.selected"
          :open="input.properties.open"
          v-on:change="$emit('change', ...arguments)"
          v-on:toogleOpen="$emit('toogleOpen', ...arguments)"
        ></select-input>
        <labels-input
          v-if="input.tag === 'labels-input'"
          :question="input.question"
          :options="input.properties.options"
          :selected="input.properties.selected"
          :status="input.properties.status"
          :errorMsg="input.properties.errorMsg"
        ></labels-input>
        <checkbox-detail
          v-if="input.tag === 'checkbox-detail'"
          :text="input.properties.text"
          :id="input.properties.id"
          :details="input.properties.details"
          :checked="input.properties.checked"
        ></checkbox-detail>
      </div>
    </form-section>
    <button-form></button-form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { FormType } from "../../types/components";

@Component({})
export default class DynamicForm extends Vue {
  @Prop({ type: Object, required: true }) form!: FormType;

  public constructor() {
    super();
    console.log(this.form);
  }
}
</script>

<style>
</style>
