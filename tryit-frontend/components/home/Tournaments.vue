<template>
    <div v-if="isTournamentsVisible">
      <!-- Your Tournaments component content goes here -->
      <h2>Tournaments</h2>
      <v-dialog
        v-model="isTournamentsVisible"
        max-width="600px"
        fullscreen
        >
        <v-card>
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-avatar>
            <v-img src="/img/Logotipo_PNG_Blanco_2.png"></v-img>
          </v-avatar>
          <v-spacer></v-spacer>
          <v-toolbar-title>
            Torneos
          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn 
            fab
            color="close"
            small
            @click="hideDialog"
          >
            <v-icon
              medium
            >mdi-close</v-icon>
          </v-btn>
          <template v-slot:extension>
          </template>
        </v-toolbar>
        
        <ul>
          <li v-for="tournament in tournaments" :key="tournament.id" style="list-style: none; margin: 20px;">
            <v-sheet 
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h3 style="color:white">{{ tournament.name }}</h3>
              <p style="color:white; padding-bottom: 5px">  {{  tournament.description }}</p>
              <p style="color:white; padding-bottom: 5px"> Fecha inicio: {{ tournament.startDate }} <v-spacer></v-spacer> Fecha fin: {{ tournament.endDate }}</p>
              <p style="color:white; padding-bottom: 5px"> <a style="color:white" :href="tournament.inscription_url">Apuntate Aquí!</a></p>
            </v-sheet>
          </li>
        </ul>

        </v-card>
        <v-card>
            <v-card-actions>
            <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <script>

  export default {

    
    data() {
      return {
        isTournamentsVisible: false,
        tournaments: [],
      };
    },
    async fetch() {
      const response = await this.$axios.$get(process.env.api + `/api/tournaments`)
      this.tournaments = response
      console.log('AAAAAAAAAAAAAAAAa')
      console.log(response)
      for(const tournament of this.tournaments){
        console.log(tournament)
      }
    },
    methods: {
      hideDialog() {
        this.isTournamentsVisible = false;
      }
    },
    created() {
        this.$nuxt.$on("toggleTournaments", () => {
            this.isTournamentsVisible = !this.isTournamentsVisible
        })
    },
  };
  </script>
  
  <style scoped>
  /* Your component-specific styles go here */
  </style>
  
