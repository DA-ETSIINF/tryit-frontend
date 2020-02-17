<template>
  <div>
    <h1>Contacto</h1>
    <contact-component
      :text="contactData.text"
      :phone="contactData.phone"
      :email="contactData.email"
    ></contact-component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { ContactComponent, ButtonComponent } from "../components";
import { ContactType } from "../types/components";

Vue.component("ButtonComponent", ButtonComponent);

@Component({ components: { ContactComponent } })
export default class Contact extends Vue {
  contactData: ContactType = {
    text:
      "¿Tienes dudas o problemas con la web? ¿Has solicitado tu entrada y quieres más información?",
    phone: "910 672 719",
    email: "tryit@da.fi.upm.es"
  };
}
</script>

<style scoped>
main > div {
  margin: 0 auto;
  margin-top: calc(52px + var(--space-m));
}

@media screen and (min-width: 600px) {
  main > div {
    max-width: 85vw;
  }
}

@media screen and (min-width: 1200px) {
  main > div {
    max-width: 800px;
  }
}
</style>