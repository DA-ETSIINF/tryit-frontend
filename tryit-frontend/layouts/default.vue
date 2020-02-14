<template>
  <div>
    <Header></Header>
    <main></main>
    <nuxt />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";
import * as Components from "~/components";

@Component({
  components: {
    Header: Components.HeaderComponent
  }
})
export default class Card extends Vue {}
</script>

<style scoped>
div {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>