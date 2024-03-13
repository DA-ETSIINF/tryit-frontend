<template>
    <div v-if="isFAQVisible">
      <!-- Your Tournaments component content goes here -->
      <h2>FAQ</h2>
      <v-dialog
        v-model="isFAQVisible"
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
            FAQ
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
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Qué es el Try IT? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                Es el congreso tecnológico organizado por alumnos más grande de la UPM. 
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Cuándo es?
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                Del 18 al 22 de marzo.
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Dónde es? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                Esta XII edición tendrá lugar en la Escuela Técnica Superior de Ingenieros Informáticos de la UPM (Campus de Montegancedo).
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Qué me aportará este congreso? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                Te permitirá estar al día de las últimas tecnologías y tendencias del mercado, complementando tu formación de la mano de ponentes de dentro de la industria. 
Además, si eres estudiante de la UPM, ¡se te podrán conceder hasta 2 ECTS por la asistencia a los talleres y ponencias! 
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Pueden acudir personas que no sean de la UPM? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                ¡Por supuesto! El Try IT! Está abierto para TODO el mundo, sean estudiantes o no. 
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Cómo consigo mi entrada si no soy estudiante de la UPM?
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                La entrada solo es necesaria para validar los ECTS al final del congreso, así que si no eres de la UPM ¡puedes asistir sin entrada sin problema!
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Hay posibilidad de ver las charlas desde casa? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                ¡Sí! Se podrán ver en directo desde la plataforma Twitch, y las ponencias se subirán a YouTube más tarde. 
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Me darán ECTs si veo las retransmisiones online? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                Desafortunadamente, no se darán créditos por conectarse a las retransmisiones online. Solo yendo a las sesiones presenciales y presentando tu entrada. 
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Qué talleres y charlas se realizarán? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                Serán todas relacionadas con la industria TIC y las ciencias, de la mano de las empresas más punteras del sector. ¡Estad atentos a nuestras redes sociales para más información! 
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Conseguiré más cosas aparte de los ECTs si acudo de forma presencial? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                ¡Entre charlas, se realizarán sorteos presenciales! Además, las empresas colaboradoras suelen traer merchandising para los asistentes (cosas gratis jeje). 
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿A qué horas son las ponencias? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                Las ponencias serán en un horario de entre las 10:00 y las 18:00. En la web puedes ver el calendario al detalle de todas las ponencias y empresas participantes. 
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Los estudiantes de máster pueden conseguir los 2 ECTs? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                Depende del máster, lo deben comunicar al coordinador de máster y nosotros nos encargamos. 
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Puedo conseguir ECTs aunque no sea de la ETSIINF? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                ¡Claro que sí! Siempre que seas de la UPM puedes conseguir créditos. 
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Por participar en los torneos dan ECTs? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                Lamentablemente no, no hay ECTs por participar ni por ganar ningún torneo (aunque sí que te puedes llevar premios guays por ganar jeje). 
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Qué es ser voluntario en TryIt? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                Trata de estar durante la semana del evento colaborando en tareas que se necesitan allí (escanear entradas, controlar aforo, montaje y desmontaje de stands, estar por el evento para cualquier cosa necesaria...). ¡Cualquier ayuda es bienvenida! 
              </p>
            </v-sheet>
          </li>
          <li style="list-style: none; margin: 20px;">
            <v-sheet class="toggleTournament"
            @click="logClick"
            color="secondary" style="padding:10px; color:white; border-radius: 5px">
              <h4 class="question" style="color:white">
                ¿Cómo consigo los ECTs? 
                <v-icon class="menu-icon" style="color:white">mdi-menu-right</v-icon></h4>
              <p class="answer" style="color:white; padding-bottom: 5px; white-space:pre-line; display:none"> 
                Estad atentos a nuestras redes sociales. Después del evento os daremos instrucciones detalladas sobre cómo reclamarlos.
              </p>
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
        isFAQVisible: false,
      };
    },
    methods: {
      hideDialog() {
        this.isFAQVisible = false;
      },
      logClick(event) {
        let clickedElement = event.target;
        if(!clickedElement.classList.contains("toggleTournament")){
          clickedElement = clickedElement.parentNode
        }
        if (clickedElement.classList.contains('toggleTournament')) {
          console.log('aertj')
          let hideElements = clickedElement.querySelector('.answer')
          if(hideElements.style.display == 'none'){
            hideElements.style.display = 'block'
            console.log(clickedElement.querySelector('.question'))
            console.log(clickedElement.querySelector('.question').querySelector('.menu-icon'))
            clickedElement.querySelector('.question').querySelector('.menu-icon').className = "v-icon notranslate menu-icon mdi mdi-menu-down theme--light"
          }
          else{
            hideElements.style.display = 'none'
            clickedElement.querySelector('.question').querySelector('.menu-icon').className = "v-icon notranslate menu-icon mdi mdi-menu-right theme--light"
          }
          
        }
      },
    },
    created() {
        this.$nuxt.$on("toggleFAQ", () => {
            this.isFAQVisible = !this.isFAQVisible
        })
    },

  };

  
  </script>

<style>
</style>
