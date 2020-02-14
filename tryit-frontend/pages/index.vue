<template>
  <h1>This is Index Page</h1>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import * as Components from "~/components";

@Component({
  components: {
    Header: Components.HeaderComponent
  }
})
export default class extends Vue {}
</script>

<style scoped>
</style>
