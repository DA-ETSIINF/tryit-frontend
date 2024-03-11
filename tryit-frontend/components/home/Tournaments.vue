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
            <!--<v-sheet 
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h3 style="color:white">{{ tournament.name }}</h3>
              <p style="color:white; padding-bottom: 5px; white-space:pre-line ;">  {{  tournament.description }}</p>
              <p style="color:white; padding-bottom: 5px"> Fecha inicio: {{ tournament.startDate }} <v-spacer></v-spacer> Fecha fin: {{ tournament.endDate }}</p>
              <p style="color:white; padding-bottom: 5px"> <a style="color:white" :href="tournament.inscription_url">Apuntate Aquí!</a></p>
            </v-sheet> -->

            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h3 class="title" style="color:white">{{ tournament.name }} <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h3>
              <p class="description" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none">  {{  tournament.description }}</p>
              <p class="date" style="color:white; padding-bottom: 5px"> Fecha inicio: {{ tournament.startDate }} <v-spacer></v-spacer> Fecha fin: {{ tournament.endDate }}</p>
              <p class="url" style="color:white; padding-bottom: 5px"> <a style="color:white" :href="tournament.inscription_url">Apuntate Aquí!</a></p>
            </v-sheet>
          </li>

         
        </ul>

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
      const response = await this.$axios.$get(process.env.api + `/api/editions/2024/tournaments`)
      this.tournaments = response
    },
    methods: {
      hideDialog() {
        this.isTournamentsVisible = false;
      },
      logClick(event) {
        let clickedElement = event.target;
        if(!clickedElement.classList.contains("toggleTournament")){
          clickedElement = clickedElement.parentNode
        }
        if (clickedElement.classList.contains('toggleTournament')) {
          console.log('aertj')
          let hideElements = clickedElement.querySelector('.description')
          if(hideElements.style.display == 'none'){
            hideElements.style.display = 'block'
            console.log(clickedElement.querySelector('.title'))
            console.log(clickedElement.querySelector('.title').querySelector('.menu-icon'))
            clickedElement.querySelector('.title').querySelector('.menu-icon').className = "v-icon notranslate menu-icon mdi mdi-menu-down theme--light"
          }
          else{
            hideElements.style.display = 'none'
            clickedElement.querySelector('.title').querySelector('.menu-icon').className = "v-icon notranslate menu-icon mdi mdi-menu-right theme--light"
          }
          
        }
      },
    },
    created() {
        this.$nuxt.$on("toggleTournaments", () => {
            this.isTournamentsVisible = !this.isTournamentsVisible
        })
    },

  };

  
  </script>

<style>
</style>
