<template>
    <v-snackbar v-model="snackbar" :color="snackbarColor" top :timeout="5000">
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
        };
    },
    created() {

        if(this.$nuxt.$auth.loggedIn && this.$nuxt.$auth.user.ticket_id === "undefined"){
            this.snackbar = true
        }
    },
};
</script>