<template>
  <div>
    <h1>{{ this.$store.getters['ticket/title'] }}</h1>
    <p class="page-description">{{ this.$store.getters['ticket/description'] }}</p>
    <dynamic-form :form="getForm()"></dynamic-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

import {
  TextInput,
  CheckboxInput,
  CheckboxDetail,
  StudentInput,
  SelectInput,
  FormSection,
  LabelsInput,
  LabelInput,
  DynamicForm,
  ButtonForm,
  ButtonComponent
} from "../components";
import { OptionSelected, SelectInputType, FormType } from "../types/components";

import {TicketModule} from "~/store/ticket"

Vue.component("CheckboxInput", CheckboxInput);
Vue.component("CheckboxDetail", CheckboxDetail);
Vue.component("StudentInput", StudentInput);
Vue.component("SelectInput", SelectInput);
Vue.component("TextInput", TextInput);
Vue.component("FormSection", FormSection);
Vue.component("LabelsInput", LabelsInput);
Vue.component("LabelInput", LabelInput);
Vue.component("ButtonForm", ButtonForm);
Vue.component("ButtonComponent", ButtonComponent);

@Component({
  name: "ticket",
  components: { DynamicForm }
})
export default class Ticket extends Vue {
  public constructor() {
    super();
    console.log(TicketModule, 99999)
    // console.log(TicketModule.mutations);
  }
  getForm(){
    return TicketModule.form()
  }
  // These functions must be moved to the store
  /*
  changedOption(newSchool: OptionSelected, shouldClose: boolean = true) {
    this.schoolInput.selected = newSchool;
    if (shouldClose) {
      this.schoolInput.open = false;
    }
  }

  toogleOpen(v: boolean, shouldClear: boolean = false) {
    if (!v) {
      this.schoolInput.selected = this.schoolInput.oldSelected;
    }
    this.schoolInput.open = v;
    if (shouldClear) {
      this.schoolInput.oldSelected = this.schoolInput.selected;
      this.schoolInput.selected = {
        ...this.schoolInput.selected,
        title: ""
      };
    }
  }
  */
}
</script>

<style></style>
