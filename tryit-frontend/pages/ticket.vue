<template>
  <div>
    <h1>{{ form.title }}</h1>
    <p class="page-description">{{ form.description }}</p>
    <dynamic-form :form="form"></dynamic-form>
    <select-input
      :title="'Example of a question'"
      :options="this.form.sections[1].inputs[1].properties.options"
      :optionSelected="this.form.sections[1].inputs[1].properties.selected"
      :open="this.form.sections[1].inputs[1].properties.open"
      v-on:change="changedOption(...arguments)"
      v-on:toogleOpen="toogleOpen(...arguments)"
    ></select-input>
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
  form: FormType = {
    title: "Consigue tu entrada",
    description: "TODO",
    sections: [
      {
        title: "Información personal",
        description:
          "Usaremos esta información para poder enviarte el ticket y para poder convalidarte los créditos",
        inputs: [
          {
            tag: "text-input",
            properties: {
              placeholder: "Nombre",
              helperText: "Obligatorio"
            }
          },
          {
            tag: "text-input",
            properties: {
              placeholder: "Apellidos",
              helperText: "Obligatorio"
            }
          },
          {
            tag: "text-input",
            properties: {
              placeholder: "DNI / NIE",
              helperText: "Obligatorio"
            }
          },
          {
            tag: "text-input",
            properties: {
              placeholder: "Email",
              helperText: "Obligatorio"
            }
          },
          {
            tag: "text-input",
            properties: {
              placeholder: "Teléfono",
              helperText: "Obligatorio"
            }
          }
        ]
      },
      {
        title: "Información universitaria",
        description:
          "Queremos conocerte un poquito más. Estos datos nos sirven para tener estadísticas y poder ofrecer mejores congresos en el futuro.",
        inputs: [
          {
            tag: "student-input",
            properties: {
              isStudent: true,
              isUpmStudent: true
            }
          },
          {
            tag: "select-input",
            question: "¿En qué Escuela estudias?",
            properties: {
              options: [
                [
                  {
                    title: "Escuela Superior de Ingenieros Informáticos",
                    id: 1
                  }
                ],
                [
                  {
                    title: "Escuela Superior de Arquitectos",
                    id: 2
                  },
                  {
                    title: "Escuela Superior de Moda",
                    id: 3
                  }
                ]
              ],
              // TODO change this to an index
              selected: {
                title: "Escuela Superior de Ingenieros Informáticos",
                id: 1
              },
              // TODO change this to an index
              oldSelected: {
                title: "Escuela Superior de Ingenieros Informáticos",
                id: 1
              },
              open: false
            }
          },
          {
            tag: "select-input",
            question: "¿Que titulación?",
            properties: {
              options: [
                [
                  {
                    title: "Ingenería Informática",
                    id: 1
                  }
                ],
                [
                  {
                    title: "Ingenería de Telecomunicaciones",
                    id: 2
                  },
                  {
                    title: "Ingenería la calle",
                    id: 3
                  }
                ]
              ],
              // TODO change this to an index
              selected: {
                title: "Escuela Superior de Ingenieros Informáticos",
                id: 1
              },
              // TODO change this to an index
              oldSelected: {
                title: "Escuela Superior de Ingenieros Informáticos",
                id: 1
              },
              open: false
            }
          },
          {
            tag: "labels-input",
            question: "¿Que curso estudias?",
            properties: {
              options: [
                {
                  title: "1",
                  id: 1
                },
                {
                  title: "2",
                  id: 2
                },
                {
                  title: "3",
                  id: 3
                }
              ],
              selected: 1
            }
          }
        ]
      },
      {
        title: "Una última cosa...",
        inputs: [
          {
            tag: "checkbox-detail",
            properties: {
              text:
                "El usuario concede a la organización el derecho de uso de las imágenes tomadas durante el evento para su posible uso en redes sociales y página web.",
              checked: false,
              id: "ticket-conditions"
            }
          }
        ]
      }
    ]
  };

  // These functions must be moved to the store
  changedOption(newSchool: OptionSelected, shouldClose: boolean = true) {
    (this.form.sections[1].inputs[1]
      .properties as SelectInputType).selected = newSchool;
    if (shouldClose) {
      (this.form.sections[1].inputs[1]
        .properties as SelectInputType).open = false;
    }
  }

  toogleOpen(v: boolean, shouldClear: boolean = false) {
    if (!v) {
      (this.form.sections[1].inputs[1]
        .properties as SelectInputType).selected = (this.form.sections[1]
        .inputs[1].properties as SelectInputType).oldSelected;
    }
    (this.form.sections[1].inputs[1].properties as SelectInputType).open = v;
    if (shouldClear) {
      (this.form.sections[1].inputs[1]
        .properties as SelectInputType).oldSelected = (this.form.sections[1]
        .inputs[1].properties as SelectInputType).selected;
      (this.form.sections[1].inputs[1]
        .properties as SelectInputType).selected = {
        ...(this.form.sections[1].inputs[1].properties as SelectInputType)
          .selected,
        title: ""
      };
    }
  }
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
