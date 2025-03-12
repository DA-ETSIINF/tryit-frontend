<template>
  <v-card class="not-found">
    <h1>Nada por aquí...</h1>
  </v-card>

</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
@Component({})
export default class NotFound extends Vue { }
</script>

<style scoped>
.not-found {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
