<template>
  <!--<v-row justify="center">-->
    <v-dialog
      v-model="isVisible"
      max-width="600px"
      fullscreen
    >
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="#00598a"
          dark
          block
          height=30vh
          v-bind="attrs"
          v-on="on"
        >
        INFORMACIÓN Y HORARIOS DE LOS EVENTOS
        </v-btn>
      </template> -->
      <v-alert
        v-if="$fetchState.error"
        type="error"
      >
        <v-row>
          <v-col cols="8">
            <strong>ERROR:</strong>No fue posible cargar los eventos.
          </v-col>
          <v-col cols="4">
            <v-btn @click="$fetch">
              REINTENTAR
            </v-btn>
            <v-btn 
              color="secondary" 
              @click="hideDialog"
                >SALIR
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
      <v-card>
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <!-- If loading, creates a circular progress bar that constantly spins
               else, it renders the congress' logo -->
          <v-progress-circular
            v-if="$fetchState.pending"
            :width="3"
            color="teal lighten-4"
            indeterminate
          ></v-progress-circular>
          <v-avatar
            v-else
            >
            <v-img src="/img/Logotipo_PNG_Blanco_2.png"></v-img>
          </v-avatar>
          <!-- @Todo Center text -->
          <v-spacer></v-spacer>
          <v-toolbar-title>
            Horarios del Evento

          </v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn 
            fab
            color="orange darken-3"
            small
            @click="hideDialog"
          >
            <v-icon
              medium
            >mdi-close</v-icon>
          </v-btn>

          <template v-slot:extension>
            <v-tabs
              v-model="tab"
              grow
              align-with-title
              next-icon="mdi-arrow-right-bold-box-outline"
              prev-icon="mdi-arrow-left-bold-box-outline"
              show-arrows
              center-active
              centered
              slider-color="yellow"
              dark
            >
        <!-- @TODO change so that color isn't hardcoded -->
              <v-tab
                v-for="post in posts"
                :key="post.day"
                @click="deleteShow()"
              >
                {{ post.day }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="(post) in posts"
            :key="post.day"
          >

            <v-timeline
            >
              <v-slide-x-reverse-transition
                group
                hide-on-leave
              >
                
                <!-- @info event.color & event.icon are to be determined depending on the type of event, for example a Talk, a Tournament or a Workshop -->
                <!-- @info It should be written on the settings of the frontend, it makes no sense to store this information on the database -->
                <v-timeline-item
                    v-for="(event, index) in posts[tab].events"
                    :key="event.id"
                    :color="event.color"
                    :icon="event.icon"
                    small
                    fill-dot
                >
                    <v-card
                        color="blue"
                    >
                        <v-card-title class="white--text">{{ event.name }}</v-card-title>
                        <v-card-subtitle class="white--text"> {{ dateToStr(event.start_date) }} - {{ dateToStr(event.end_date) }}</v-card-subtitle>
                        <v-card-text class="white--text">{{ event.desc }}</v-card-text>
                        <v-card-actions>
                          <v-dialog
                            v-model="show[index]"
                            max-width="60%"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-row
                                align="center"
                                justify="space-around"
                              >
                                <v-btn
                                  dark
                                  rounded
                                  v-bind="attrs"
                                  large
                                  color="secondary"
                                  v-on="on"
                                  @click="showInfo(index)"
                                >
                                  <v-icon 
                                    left
                                    dark
                                    x-large
                                    color="white"
                                    class="mx-3"
                                  >
                                    <!-- mdi-information-outline -->
                                    mdi-information
                                  </v-icon>

                                  INFORMACIÓN
                                </v-btn>
                              </v-row>
                            </template>

                            <v-card
                              class="mx-auto"
                            >
                              <!-- @info Sample Speaker, should be retrieved via API -->
                              <v-img
                                src="https://isetta.io/images/interviews/casey-muratori.jpg"
                                id="event-img"
                              >
                              </v-img>

                              <v-card-title>
                                {{ event.name }}
                              </v-card-title>

                              <v-card-subtitle>
                                {{ event.brief }} - NOMBRE_PONENTE
                              </v-card-subtitle>

                              <v-card-actions
                                  v-if="event.desc"
                              >
                                <v-btn
                                  color="orange lighten-2"
                                  text
                                >
                                  Sobre la Actividad
                                </v-btn>

                                <v-spacer></v-spacer>

                                <v-btn
                                  icon
                                  @click="show_desc = !show_desc"
                                >
                                  <v-icon>{{ show_desc ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                </v-btn>
                              </v-card-actions>

                              <v-expand-transition>
                                <div v-show="show_desc">
                                  <v-divider></v-divider>

                                  <v-card-text>
                                    {{ event.desc }}
                                  </v-card-text>
                                </div>
                              </v-expand-transition>

                              <v-card-actions
                                v-if="event.start_date"
                              >
                                <v-btn
                                  color="orange lighten-2"
                                  text
                                >
                                  Horarios
                                </v-btn>

                                <v-spacer></v-spacer>

                                <v-btn
                                  icon
                                  @click="show_time = !show_time"
                                >
                                  <v-icon>{{ show_time ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                </v-btn>
                              </v-card-actions>

                              <v-expand-transition>
                                <div v-show="show_time">
                                  <v-divider></v-divider>

                                  <v-card-text>
                                    La actividad comienza el {{ dateToStr(event.start_date) }} y termina el {{ dateToStr(event.end_date) }}
                                  </v-card-text>
                                </div>
                              </v-expand-transition>

                            </v-card>
                          
                          </v-dialog>
                        </v-card-actions>
                    </v-card>
                </v-timeline-item>
              
              </v-slide-x-reverse-transition>
            </v-timeline>
          </v-tab-item>
        </v-tabs-items>
      </v-card>

    </v-dialog>
  <!--</v-row>-->
</template>

<script>

export default {
  data()  {
      return{
        tab: 0,
        show_desc: true,
        show_time: true,
        isVisible: false,
        show: [],
        posts: []
      }
  },
  async fetch() {
      this.posts = await this.$axios.$get(`http://127.0.0.1:8000/api/editions/2022/schedule`)
    // @info This is the modification of the obtained /schedule/ endpoint to include colors and icons
    //   https://materialdesignicons.com/
      for (const post of this.posts) {
        for (const ev of post.events) {
          switch (ev.type) {
            case "TK":
            //   Ponencia
            ev['brief'] = 'Ponencia' //  - ¿Quieres aprender algo nuevo? ¡TryIT!
            ev['color'] = 'blue darken-1'
            ev['icon'] = 'mdi-account-voice'
            break;
            case "WS":
            //   Taller
            ev['brief'] = 'Taller' //  - ¿Quieres mejorar tus habilidades técnicas? ¡TryIT!
            ev['color'] = 'grey darken-3'
            ev['icon'] = 'mdi-hammer-wrench'
            break;
            case "LT":
            //   Lightning Talk
            ev['brief'] = 'Lightning Talk' //  - ¿Cómo? ¿Que no es posible aprender algo en 30 minutos? ¡TryIT!
            ev['color'] = 'blue lighten-2'
            ev['icon'] = 'mdi-timer-outline'
            break;
            case "SP":
            //   Especial
            ev['brief'] = 'Especial' //  - Solo nuestros señores reptilianos saben que ocurrirá aquí...
            ev['color'] = 'green lighten-1'
            ev['icon'] = 'mdi-alien'
            break;
            case "TO":
            //   Torneo
            ev['brief'] = 'Concurso' //  - ¡Donde el TryHardeo tiene premio!
            ev['color'] = 'purple darken-1'
            ev['icon'] = 'mdi-bullseye-arrow'
            break;
            default:
            // Unknown Type
            // @info Easter Eggs de Halo por si alguien en un futuro está mirando esto y lo está pasando mal
            // - @PrinceKiwii
            ev['title'] = "ERROR: Wake up, Chief. I need you."
            ev['desc'] = "ERROR: Don't make a girl a promise... if you know you can't keep it. "
            ev['brief'] = "ERROR: It's been an honor serving with you, John."
            ev['color'] = 'red darken-1'
            ev['icon'] = 'mdi-alert'
            break;
          }
        }
      }    
  },
  methods: {
    hideDialog()  {
      this.isVisible = false
    },
    /*showInfo(index) {
      if(this.show.includes(index)) {
        this.show = this.show.filter(item => item !== index)
      }
      else  {
        this.show.push(index)
      }
    },*/
    showInfo(index) {
      if(index >= this.show.length) {
        this.show.length = index + 1
        this.show[index] = true
      }
      else  {
        this.show[index] = true
      }
    },
    deleteShow()  {
      this.show = this.show.splice(0, this.show.length)
    },
    dateToStr(dateString) {
      
      // 2022-02-20T19:00:00Z
      const newDate = new Date(Date.parse(dateString.slice(0, -1)))
      var dateString = newDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
      dateString = dateString[0].toUpperCase() + dateString.substring(1) // First Letter in Mayus
      var timeString = newDate.toLocaleTimeString('es-ES')
      timeString = timeString[0].toUpperCase() + timeString.substring(1) // First Letter in Mayus

      return `${dateString} ${timeString}`
    },
  },
  created() {
    this.$nuxt.$on("toggleTimeline", () => {
      this.isVisible = !this.isVisible
    })
  }
}

</script>

<style scoped>

#event-img  {
    max-width: auto;
    max-height: 100%;
    /* border-radius: 50%;  */
}

.text-right-margin {
  margin-right: 5%;
}
</style>