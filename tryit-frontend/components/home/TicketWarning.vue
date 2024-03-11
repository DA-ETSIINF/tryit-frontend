<template>
    <v-snackbar v-model="snackbar" :color="snackbarColor" top>
        {{ snackbarMessage }}
        <v-btn text @click="snackbar = false">Close</v-btn>
    </v-snackbar>
</template>

<script>
export default {
    data() {
        return {
            snackbar: false,
            snackbarMessage: 'Has iniciado sesión pero todavía no has sacado entrada. ¡Saca tu entrada en la sección de entradas para acreditar las charlas!',
            snackbarColor: 'warning', // or 'error', 'warning', 'info'
            tickets: [],
        };
    },
    async fetch() {
        const response = this.$axios.$get(process.env.api + '/api/tickets')
        if(this.$nuxt.$auth.loggedIn && !this.$nuxt.$auth.user.ticket_id){
            snackbar = true
        }
    },
};
</script>