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
      </template> -->
      <v-card>
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
      hideDialog()  {
        this.isLoginVisible = false
      },
      doLogin() {
        var login = false
        var data = this.loginInfo
        axios.post("http://localhost:8000/api/users/login/", data).then((response) => {
          console.log(response);
          var token = response.data.access_token
          console.log(token)
          localStorage.setItem('user-token', token) // store the token in localstorage
          login = true
          this.hideDialog()
        })
        .catch(err => {
          localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
          login = false
        })
      }
    },
    created() {
      this.$nuxt.$on("toggleLoginForm", () => {
        this.isLoginVisible = !this.isLoginVisible
      })
    }
  }
</script>