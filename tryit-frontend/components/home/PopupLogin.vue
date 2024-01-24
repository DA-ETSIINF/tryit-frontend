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
  },
  created() {
    this.$nuxt.$on("toggleLoginForm", () => {
      this.isLoginVisible = !this.isLoginVisible
    })
  },
}
</script>