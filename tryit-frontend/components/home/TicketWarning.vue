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
            snackbar: true,
            snackbarMessage: 'Has iniciado sesión pero todavía no has sacado entrada. ¡Saca tu entrada en la sección de entradas para acreditar las charlas!',
            snackbarColor: 'warning', // or 'error', 'warning', 'info'
            tickets: [],
        };
    },
    async fetch() {
        const response = this.$axios.$get(process.env.api + '/api/tickets')
        
        if (process.client) {
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAa')
            console.log(process.env.api)
            console.log(response)
            this.tickets = response
            for (const ticket in response) {
                console.log(ticket)
            }
            console.log('bBBBBBBBBBBBBBBB')
        }
    },
};
</script>