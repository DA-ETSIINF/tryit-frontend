<template>
  <div class="form-container">
    <form-section v-for="(section, i) in form.sections" :key="`section-${i}`" :section="section">
      <div v-for="(input, j) in section.inputs" :key="`input-${i}-${j}`">
        <text-input
          v-if="input.tag === 'text-input'"
          :helperText="input.properties.helperText"
          :placeholder="input.properties.placeholder"
          :value="input.value"
          :isDisabled="input.properties.isDisabled"
          :hideText="input.properties.hideText"
          :status="input.properties.status"
          :noBorder="input.properties.noBorder"
          :noShadows="input.properties.noShadows"
          :leaveSpaceRight="input.properties.leaveSpaceRight"
          :id="input.id"
          :validations="input.requirements"
          :indexes="input.indexes"
          :formModule="formModule"
          :show="input.show"
        ></text-input>
        <text-area
          v-if="input.tag === 'text-area'"
          :helperText="input.properties.helperText"
          :placeholder="input.properties.placeholder"
          :value="input.value"
          :isDisabled="input.properties.isDisabled"
          :hideText="input.properties.hideText"
          :status="input.properties.status"
          :noBorder="input.properties.noBorder"
          :noShadows="input.properties.noShadows"
          :leaveSpaceRight="input.properties.leaveSpaceRight"
          :show="input.show"
        ></text-area>
        <student-input
          v-if="input.tag === 'student-input'"
          :isStudent="input.value.isStudent"
          :isUpmStudent="input.value.isUpmStudent"
          :validations="input.requirements"
          :indexes="input.indexes"
          :formModule="formModule"
          :show="input.show"
        ></student-input>
        <select-input
          v-if="input.tag === 'select-input' && input.show"
          :title="input.question"
          :options="input.properties.options"
          :selected="input.properties.selected"
          :oldSelected="input.properties.oldSelected"
          :open="input.properties.open"
          :indexes="input.indexes"
          v-on:change="$emit('change', ...arguments)"
          v-on:toogleOpen="$emit('toogleOpen', ...arguments)"
          :show="input.show"
        ></select-input>
        <labels-input
          v-if="input.tag === 'labels-input'"
          :question="input.question"
          :options="input.properties.options"
          :selected="input.properties.selected"
          :status="input.properties.status"
          :errorMsg="input.properties.errorMsg"
          :show="input.show"
        ></labels-input>
        <checkbox-detail
          v-if="input.tag === 'checkbox-detail'"
          :text="input.properties.text"
          :id="input.id"
          :details="input.properties.details"
          :checked="input.properties.checked"
          :show="input.show"
        ></checkbox-detail>
        <availability-input
          v-if="input.tag === 'availability-input'"
          :timePeriods="input.properties.timePeriods"
          :periodsAvailable="input.properties.periodsAvailable"
          :show="input.show"
        ></availability-input>
      </div>
    </form-section>
    <button-form></button-form>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
import { FormType, DynamicFormModule } from "../../types/components";

@Component({})
export default class DynamicForm extends Vue {
  @Prop({ type: Object, required: true }) readonly form!: FormType;
  @Prop({ type: String, required: true })
  readonly formModule!: DynamicFormModule;
}
</script>

<style>
main {
  margin-top: 52px;
}

h4 {
  margin: var(--space-l);
  margin-bottom: 0;
  width: calc(100% - 2 * var(--space-l));
}
.form-inputs > div > div {
  width: calc(100% - 2 * var(--space-l));
  margin: var(--space-s) var(--space-l);
}

.one-column .form-inputs > div > div {
  width: initial;
  margin: 0 auto;
}

h1 {
  margin: var(--space-xxs) var(--space-l);
}

p {
  padding-bottom: 0;
  margin: var(--space-xxs) var(--space-l);
  margin-top: 0;
}
@media screen and (min-width: 900px) {
  h1 {
    margin: var(--space-xxs) auto;
    width: 760px;
  }
  p.page-description {
    margin: var(--space-xxs) auto;
    margin-bottom: var(--space-l);
    width: 760px;
  }
}
</style>
