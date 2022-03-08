<template>
      <v-alert v-if="$store.getters.getAdmin" type="success">Este usuario es administrador</v-alert>
      <v-alert v-else-if="$store.getters.getLogged" type="warning">Este usuario no tiene permisos de administrador</v-alert>
      <v-card v-else>
        <v-card-title>
          <span class="text-h5">Login</span>
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
                        label="Username*"
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
                color="blue darken-1"
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
            isLoginVisible: false,
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
                //console.log(response);
                var token = res.data.access_token
                //console.log(token)
                //localStorage.setItem('user-token', token) // store the token in localstorage
                this.$store.commit("login", token)

            }
            catch(err) {
                //console.log(err)
                this.$store.commit("logout") // if the request fails, remove any possible user token if possible
                return;
            }
            const userToken = this.$store.getters.getToken
            //console.log("asdasd "+userToken)
            //console.log(this.$store.state.isLogged)
            const config = {
                headers: {
                Authorization: "Token " + userToken,
                }
            }
            console.log(config.headers.Authorization)
            
            const res = await axios.get("http://localhost:8000/api/users/auth/", config)
            let result = res.data.user == "admin"
            console.log(result)
            result ? this.$store.commit("giveAdminAccess") : this.$store.commit("revokeAdminAccess")
        },
    },
}
</script>