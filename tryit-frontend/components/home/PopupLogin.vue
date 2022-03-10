<template>
  <!--<v-row justify="center">-->
    <v-dialog
      v-model="isLoginVisible"
      max-width="600px"
    >
      <Login />
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              dark
              rounded
              x-large
              color="close"
              @click="hideDialog"
            >
              <v-icon 
                left
                dark
                x-large
                color="white"
                class="mx-3"
              >
                <!-- mdi-information-outline -->
                mdi-close
              </v-icon>

              Cerrar
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!--</v-row>-->
</template>

<script>

import axios from "axios"
import Login from "./Login"

export default {
  components: {
    Login
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
        let result = res.data.user == "admin"
        console.log(result)
        result ? this.$store.commit("giveAdminAccess") : this.$store.commit("revokeAdminAccess")
                  // this.hideDialog()
        //console.log(this.$store.getters.getAdmin)
        // if(this.$store.getters.getLogged)  {
        //   this.showQRReader()
        // }    
    },
    // showQRReader()  {
    //   if(this.$store.getters.getAdmin) {
    //     this.$nuxt.$emit("toggleQRReader")
    //   }
    // },
    // showLoginForm() {
    //       this.$nuxt.$emit("toggleLoginForm")
    // },
  },
  created() {
    this.$nuxt.$on("toggleLoginForm", () => {
      this.isLoginVisible = !this.isLoginVisible
    })
  },
}
</script>