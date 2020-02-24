<template>
  <div>
    <h1>{{ getTitle() }}</h1>
    <p class="page-description">{{ getDescription() }}</p>
    <dynamic-form :form="getForm()" :formModule="getFormModule()" @send="postVolunteer()"></dynamic-form>
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
  AvailabilityInput,
  LabelsInput,
  LabelInput
} from "../components";
import { FormType } from "../types/components";
import { VolunteerModule } from "../store/volunteer";
import { State, Action, Getter } from "vuex-class";

Vue.component("CheckboxInput", CheckboxInput);
Vue.component("TextArea", TextArea);
Vue.component("CheckboxDetail", CheckboxDetail);
Vue.component("TextInput", TextInput);
Vue.component("FormSection", FormSection);
Vue.component("ButtonForm", ButtonForm);
Vue.component("ButtonComponent", ButtonComponent);
Vue.component("AvailabilityInput", AvailabilityInput);
Vue.component("LabelsInput", LabelsInput);
Vue.component("LabelInput", LabelInput);

@Component({ components: { DynamicForm } })
export default class Volunteers extends Vue {
  form: FormType = VolunteerModule.volunteerForm;

  created() {
    VolunteerModule.getVolunteersTimePeriods();
  }

  getTitle(): string | undefined {
    return VolunteerModule.getTitle;
  }

  getDescription(): string | undefined {
    return VolunteerModule.getDescription;
  }

  getForm(): FormType {
    return VolunteerModule.volunteerForm;
  }

  getFormModule(): string {
    return VolunteerModule.getFormModule;
  }
  
  postVolunteer() {
    VolunteerModule.postVolunteer();
  }
}
</script>

<style scoped></style>
