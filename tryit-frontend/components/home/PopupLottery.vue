<template>
    <v-dialog
      v-model="isVisible"
      max-width="600px"
    >
        <Login v-if="!$store.getters.getLogged"/>
        <v-alert v-else-if="!$store.getters.getAdmin" type="error">Este usuario no posee permisos de administrador
            <v-btn @click="launchLogout">Cerrar sesión</v-btn>      
        </v-alert>
        <v-card v-else color="primary">
            <v-btn
                rounded
                dark
                x-large
                color="accept"
                @click="doLottery"
            >
                <v-icon
                    left
                    x-large
                    color="white"
                    class="mx-3"    
                >mdi-clover
                </v-icon>
                REALIZAR SORTEO
            </v-btn>
            <v-list three-line>
                <v-list-item>Ganador: {{ winner }}</v-list-item>
                <template v-for="(attendee, index) in attendees">
                    <v-divider :key="index"></v-divider>
                    <v-list-item :key="index">
                        <v-list-item-content>
                            <v-list-item-title>{{ attendee.id }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>

        </v-card>
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
</template>

<script>
import Login from "./Login"

export default {
    components: {
        Login
    },
    data()  {
        return{
          isVisible: false,
          attendees: [],
          winner: ""
        }
    },
    async fetch() {
        this.attendees = await this.$axios.$get(process.env.api + `/api/attendees`)
    },
    methods: {
        hideDialog()  {
            this.isVisible = false
        },
        launchLogout() {
            this.$store.commit("logout")
            this.$store.commit("revokeAdminAccess")
        },
        doLottery() {
            const winNum = Math.floor(Math.random() * this.attendees.length)
            this.winner = this.attendees[winNum].id
        }
    },
    created() {
        this.$nuxt.$on("toggleLottery", () => {
            this.isVisible = !this.isVisible
        })
    }
  }
</script>