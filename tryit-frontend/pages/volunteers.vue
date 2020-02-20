<template>
  <div>
    <h1>{{ getTitle() }}</h1>
    <p class="page-description">{{ getDescription() }}</p>
    <dynamic-form :form="getForm()"></dynamic-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import {
  TextInput,
  TextArea,
  CheckboxInput,
  CheckboxDetail,
  FormSection,
  DynamicForm,
  ButtonForm,
  ButtonComponent,
  AvailabilityInput
} from "../components";
import { FormType } from "../types/components";
import { VolunteerModule } from "../store/volunteer";

Vue.component("CheckboxInput", CheckboxInput);
Vue.component("TextArea", TextArea);
Vue.component("CheckboxDetail", CheckboxDetail);
Vue.component("TextInput", TextInput);
Vue.component("FormSection", FormSection);
Vue.component("ButtonForm", ButtonForm);
Vue.component("ButtonComponent", ButtonComponent);
Vue.component("AvailabilityInput", AvailabilityInput);

@Component({ components: { DynamicForm } })
export default class Volunteers extends Vue {
  getTitle(): string {
    return this.$store.getters["ticket/getTitle"];
  }

  getDescription(): string {
    return this.$store.getters["ticket/getDescription"];
  }

  getForm(): FormType {
    return VolunteerModule.volunteerForm;
  }
}
</script>

<style scoped></style>
