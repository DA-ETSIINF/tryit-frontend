<template>
  <div>
    <h1>{{ form.title }}</h1>
    <p class="page-description">{{ form.description }}</p>
    <dynamic-form :form="form"></dynamic-form>
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
  form: FormType = {
    title: "Registro voluntarios",
    description:
      "Rellena este formulario si te interesa ayudarnos a la realización del congreso. Los voluntarios podréis conseguir hasta 1 ECTS extra, además de los 2 ECTS por asistir a todas las charlas, lo cual es posible. Una vez rellenado el formulario, nos pondremos en contacto contigo si acabas siendo seleccionado. Intentaremos dar prioridad a las personas que más necesiten los créditos, así que háznoslo saber en la caja de comentarios.",
    sections: [
      {
        title: "Información personal",
        description:
          "Para poder registrarte como posible voluntario necesitarás primero tener un ticket que puedes conseguir <a target='_blank' href=''>aquí</>",
        inputs: [
          {
            tag: "text-input",
            properties: {
              placeholder: "DNI / NIE",
              helperText: "Obligatorio"
            }
          },
          {
            tag: "text-area",
            properties: {
              placeholder:
                "¿Algo qué deberíamos saber?¿Necesitas los créditos con urgencia?"
            }
          },
          {
            tag: "checkbox-detail",
            properties: {
              text: "Tengo un dispositivo android",
              details: [
                "Necesitamos validar las entradas de los asistentes con una app que funciona en android",
                "Si rellenas esta casilla, es posible que deberás instalarte una app para el checkeo de las entradas"
              ],
              checked: false,
              id: "android"
            }
          }
        ]
      },
      {
        title: "Disponibilidad",
        description:
          "Recuerda que a mayor número de períodos de tiempo escogidos, mayor será la probabilidad de que te seleccionemos.",
        oneColumnSection: true,
        inputs: [
          {
            tag: "availability-input",
            properties: {
              periodsAvailable: ["morning", "afternoon"],
              timePeriods: [
                {
                  ms: 1581957346821,
                  dayWeek: "Lunes",
                  dayMonth: "17 de febrero",
                  dayPeriods: [
                    {
                      period: "morning",
                      checked: false,
                      id: 1
                    },
                    {
                      period: "afternoon",
                      checked: false,
                      id: 2
                    }
                  ]
                },
                {
                  ms: 1581957346821,
                  dayWeek: "Martes",
                  dayMonth: "18 de febrero",
                  dayPeriods: [
                    {
                      period: "morning",
                      checked: false,
                      id: 3
                    },
                    {
                      period: "afternoon",
                      checked: false,
                      id: 4
                    }
                  ]
                },
                {
                  ms: 1581957346821,
                  dayWeek: "Miércoles",
                  dayMonth: "19 de febrero",
                  dayPeriods: [
                    {
                      period: "morning",
                      checked: false,
                      id: 5
                    },
                    {
                      period: "afternoon",
                      checked: false,
                      id: 6
                    }
                  ]
                },
                {
                  ms: 1581957346821,
                  dayWeek: "Jueves",
                  dayMonth: "20 de febrero",
                  dayPeriods: [
                    {
                      period: "morning",
                      checked: false,
                      id: 7
                    },
                    {
                      period: "afternoon",
                      checked: false,
                      id: 8
                    }
                  ]
                }
              ]
            }
          }
        ]
      },
      {
        title: "Y una firmita por aquí...",
        inputs: [
          {
            tag: "checkbox-detail",
            properties: {
              text:
                "He leído y acepto los <a target='_blank' href='https://drive.google.com/file/d/1XsGYJJyDW2Flq06Qpj1HQM4Z1SgvIqTV/view?usp=sharing'>términos y condiciones de inscripción de voluntarios Try IT! 2020</a>",
              checked: false,
              id: "ticket-conditions"
            }
          }
        ]
      }
    ]
  };
}
</script>

<style scoped></style>
