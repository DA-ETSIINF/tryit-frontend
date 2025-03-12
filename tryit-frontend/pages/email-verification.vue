<template>
    <v-card class="container">
        <h1>¡Email verificado!</h1>
        <p>Te hemos enviado tu entrada, revisa tu buzón.</p>
    </v-card>
    
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
@Component({})
export default class NotFound extends Vue {}
</script>

<style scoped>
h1 {
    
}
.container {
    margin-top: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>