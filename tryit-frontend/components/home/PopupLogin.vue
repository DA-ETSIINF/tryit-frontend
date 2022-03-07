<template>
  <!--<v-row justify="center">-->
    <v-dialog
      v-model="isLoginVisible"
      max-width="600px"
    >
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          block
          height=30vh
          v-bind="attrs"
          v-on="on"
        >
        LOGIN
        </v-btn>
      </template>-->
      <QRReader v-if="$store.getters.getAdmin" />
      <v-alert v-else-if="$store.getters.getLogged" type="error">Este usuario no tiene los permisos necesarios</v-alert>
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
            text
            @click="hideDialog"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="doLogin"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!--</v-row>-->
</template>

<script>

import axios from "axios"
import QRReader from "./QRReader"

export default {
  components: {
    QRReader
  },
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
    hideDialog()  {
      this.isLoginVisible = false
    },
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
        let result = res.data.user == "tryit_user"
        //console.log(result)
        result ? this.$store.commit("giveAdminAccess") : this.$store.commit("revokeAdminAccess")
                  // this.hideDialog()

        if(this.$store.getters.getLogged)  {
          this.showQRReader()
          console.log("ahbaskfhubafubalfiuhsalfiuhbfliuhfliu")
        }    
    },
    showQRReader()  {
      if(this.$store.getters.getAdmin) {
        this.$nuxt.$emit("toggleQRReader")
        console.log("cago en todo")
      }
    },
    showLoginForm() {
          this.$nuxt.$emit("toggleLoginForm")
    },

      
    },

    

    created() {
      this.$nuxt.$on("toggleLoginForm", () => {
        this.isLoginVisible = !this.isLoginVisible
      })
    },
  }
</script>