<template>
  <!--<v-row justify="center">-->
    <v-dialog
      v-model="isVisible"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          block
          height=30vh
          v-bind="attrs"
          v-on="on"
          @click="hideDialog"
        >
        LOGIN
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
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
                  v-model="username"
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
                  v-model="password"
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
          isVisible: false,
          username: '',
          password: ''
        }
    },
    /*computed:   {
      changeVisibility()  {
        this.isVisible = this.$store.state.isTicketFormVisible
      }
    },*/
    methods: {
      hideDialog()  {
        this.isVisible = false
      },
      doLogin() {
        var login = false
        axios.post("http://127.0.0.1:8000/api/users/login/", { "username": username, "password": password}) 
        if (login) {
          this.hideDialog()
        }
      }
    },
    created() {
      this.$nuxt.$on("toggleTicketForm", () => {
        this.isVisible = !this.isVisible
      })
    }
  }
</script>