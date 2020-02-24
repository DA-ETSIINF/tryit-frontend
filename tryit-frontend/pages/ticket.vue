<template>
  <div>
    <h1>{{ getTitle() }}</h1>
    <p class="page-description">{{ getDescription()}}</p>
    <dynamic-form :form="getForm()" :formModule="getFormModule()" @send="postTicket()"></dynamic-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "nuxt-property-decorator";

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
import {
  OptionSelected,
  SelectInputType,
  FormType,
  Indexes
} from "../types/components";
import { TicketModule } from "../store/ticket";

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
  getTitle(): string | undefined {
    return TicketModule.getTitle;
  }

  getDescription(): string | undefined {
    return TicketModule.getDescription;
  }

  getForm(): FormType {
    return TicketModule.ticketForm;
  }

  getFormModule(): string {
    return TicketModule.getFormModule;
  }

  postTicket() {
    TicketModule.postTicket();
  }
}
</script>

<style></style>
