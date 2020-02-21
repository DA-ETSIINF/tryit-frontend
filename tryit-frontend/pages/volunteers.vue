<template>
  <div>
    <h1>{{ getTitle() }}</h1>
    <p class="page-description">{{ getDescription() }}</p>
    <dynamic-form :form="getForm()" :formModule="getFormModule()"></dynamic-form>
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
  getTitle(): string | undefined {
    return VolunteerModule.getTitle;
  }

  getDescription(): string | undefined {
    return VolunteerModule.getDescription;
  }

  getForm(): FormType {
    console.log("Form: ", VolunteerModule.getVolunteerForm)
    return VolunteerModule.getVolunteerForm;
  }
  getFormModule(): string {
    return VolunteerModule.getFormModule;
  }
}
</script>

<style scoped></style>
