<template>
      <v-alert v-if="$store.getters.getAdmin" type="success">Este usuario es administrador</v-alert>
      <v-alert v-else-if="$store.getters.getLogged" type="warning">Este usuario no tiene permisos de administrador</v-alert>
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
            loginInfo: {
            username: '',
            password: ''
            }
        }
    },
    methods: {
        async doLogin() {
            var data = this.loginInfo
            try {
                const res = await axios.post("http://localhost:8000/api/users/login/", data)
                var token = res.data.access_token
                this.$store.commit("login", token)

            }
            catch(err) {
                this.$store.commit("logout") // if the request fails, remove any possible user token if possible
                return;
            }
            const userToken = this.$store.getters.getToken
            const config = {
                headers: {
                Authorization: "Token " + userToken,
                }
            }
            
            const res = await axios.get("http://localhost:8000/api/users/auth/", config)
            let result = res.data.user == "asistencia"
            result ? this.$store.commit("giveAdminAccess") : this.$store.commit("revokeAdminAccess")
        },
    },
}
</script>