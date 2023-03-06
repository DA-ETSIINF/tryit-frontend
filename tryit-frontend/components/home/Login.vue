<template>
      <v-alert v-if="$store.getters.getAdmin" type="success">Este usuario es administrador</v-alert>
      <v-alert v-else-if="$store.getters.getLogged" type="warning">Este usuario no tiene permisos de administrador</v-alert>
      <v-alert
        v-else-if="not_activated"
        type="error"
        close-text="Cerrar"
        color="error"
        dismissible
        >
        ¡No has activado tu email! Si quieres que te enviemos otro correo, pulsa 
        <v-btn
        depressed
        color="primary"
        @click="sendActivationEmail()"
        plain
        >
        aquí. 
        </v-btn>
      </v-alert>
      <v-alert
        v-else-if="confirmation_email_sent_ok"
        type="success"
        close-text="Cerrar"
        color="green"
        dismissible
        >
            ¡Correo de activación enviado! Revisa tu bandeja de entrada.
      </v-alert>
      <v-alert
        v-else-if="confirmation_email_sent_error"
        type="error"
        close-text="Cerrar"
        color="red"
        dismissible
        >
            ¡Error al enviar el correo de activación! Inténtalo de nuevo más tarde.
      </v-alert>

      <v-card v-else>
       
        <v-card-title class="text-h5 white--text primary">
            Iniciar sesión
        </v-card-title>
        <v-card-text>
            <v-container>
                <v-row>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-text-field
                        v-model="loginInfo.username"
                        label="Usuario*"
                        required
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                >
                    <v-text-field
                        v-model="loginInfo.password"
                        label="Contraseña*"
                        input type="password"
                        required
                    ></v-text-field>
                </v-col>
                </v-row>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="accept"
                rounded
                x-large
                dark
                @click="doLogin"
            >
                Iniciar sesión
            </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>

import axios from "axios"

export default {

    data()  {
        return{
            not_activated: false,
            confirmation_email_sent_ok: false,
            confirmation_email_sent_error: false,
            loginInfo: {
            username: '',
            password: ''
            }
        }
    },
    methods: {
        async sendActivationEmail() {
            var username = this.loginInfo["username"];
            var data = {
                "username": username
            };
            try{
                const res = await axios.post(process.env.api + "/api/users/resend_activation_email/", data)
                this.not_activated = false
                this.confirmation_email_sent_ok = true
            }
            catch(error){
                this.not_activated = false
                this.confirmation_email_sent_error = true
            };
        },
        async doLogin() {
            var data = this.loginInfo
            var error = false
            var error2 = false
            //const xd = this
            const res = await axios.post(process.env.api + "/api/users/login/", data).catch(function (error){
                if (error.response && error.response.status == 406) {
                    error2 = true
                    return;
                }
                error = true
            });
            if(error2){
                this.not_activated = true
                return;
            }
            if(error ){
                this.$store.commit("logout"); // if the request fails, remove any possible user token if possible
                return;
            }
            var token = res.data.access_token
            this.$store.commit("login", token)

            
            const userToken = this.$store.getters.getToken
            const config = {
                headers: {
                Authorization: "Token " + userToken,
                }
            }
            //since res is const(ant) we can't modify it, so we need to create a new variable
            const res2 = await axios.get(process.env.api + "/api/users/auth/", config)
            let result = res2.data.user == "asistencia"
                result ? this.$store.commit("giveAdminAccess") : this.$store.commit("revokeAdminAccess")
        },
    },
}
</script>