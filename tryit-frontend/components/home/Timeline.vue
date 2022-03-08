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
                    large
                    fill-dot
                >
                    <template v-slot:opposite>
                      <span
                        :class="`headline font-weight-bold ${event.color}--text`"
                      >
                      De {{ dateToTimeStr(event.start_date) }} a {{ dateToTimeStr(event.end_date) }}
                      </span>
                    </template>
                      <v-card
                        color="primary"
                        class="elevation-2"
                      >
                        <v-img
                          max-height="2vh"
                          src="/img/tryit_background1.png"
                        >

                        </v-img>
                        <v-card-title class="text-h4 white--text">
                          {{ event.name }}
                        </v-card-title>
                        <!-- <v-card-subtitle class="white--text"> {{ dateToStr(event.start_date) }} - {{ dateToStr(event.end_date) }}</v-card-subtitle> -->
                        <v-card-subtitle class="text-h6 white--text"> {{ getSubtitle(event) }} </v-card-subtitle>
                        <v-card-text >
                          <p class="white--text"> {{ event.desc }} </p>
                          
                        </v-card-text>

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
                                    mdi-information
                                  </v-icon>

                                  INFORMACIÓN
                                </v-btn>
                              </v-row>
                            </template>

                            <v-card
                              class="mx-auto"
                            > 
                              <!-- @info Poster del evento: puede ser tanto una imagen propia (prioritario) como un enlace -->
                              <v-img
                                v-if="event.poster_img"
                                :src="event.poster_img"
                                id="event-img"
                              />
                              <v-img
                                v-else
                                :src="event.poster_link"
                                id="event-img"
                              />
                              <v-card-title>
                                {{ event.name }}
                              </v-card-title>

                              <v-card-subtitle>
                                {{ getSubtitle(event) }}
                              </v-card-subtitle>

                              <!-- @info Cada acción está compuesta de un v-card-actions y un v-expand-transition -->

                              <!-- Horarios -->

                              <v-card-actions
                                v-if="event.start_date"
                              >
                                <v-btn
                                  color="primary"
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

                              <!-- Descripcion -->

                              <v-card-actions
                                  v-if="event.desc"
                              >
                                <v-btn
                                  color="primary"
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

                              <!-- Ponentes -->

                              <v-card-actions
                                v-if="event.speakers"
                              >
                                <v-btn
                                  color="primary"
                                  text
                                >
                                  Ponente/s
                                </v-btn>

                                <v-spacer></v-spacer>

                                <v-btn
                                  icon
                                  @click="show_speakers = !show_speakers"
                                >
                                  <v-icon>{{ show_speakers ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                                </v-btn>
                              </v-card-actions>

                              <v-expand-transition>
                                <div v-show="show_speakers">
                                  <v-divider></v-divider>

                                  <template>
                                    <v-tabs
                                      v-model="speaker_tab"
                                      grow
                                      center-active
                                      centered
                                      slider-color="secondary"
                                      light
                                    >
                                <!-- @TODO change so that color isn't hardcoded -->
                                      <v-tab
                                        v-for="speaker in event.speakers"
                                        :key="speaker.id"
                                      >
                                        {{ getSpeakerName(speaker) }}
                                      </v-tab>
                                    </v-tabs>
                                  </template>

                                  <v-tabs-items v-model="speaker_tab">
                                    <v-tab-item
                                      v-for="speaker in event.speakers"
                                      :key="speaker.id"
                                    >
                                      <v-card
                                        class="mx-auto"
                                      > 
                                        <v-row justify="center">
                                          <v-avatar
                                            v-if="speaker.pic_img"
                                            rounded
                                            size="200"
                                          >
                                            <img
                                              :src="speaker.pic_img"
                                              alt="Speaker"
                                            >
                                          </v-avatar>
                                          <v-avatar
                                            v-else
                                            rounded
                                            size="200"
                                          >
                                            <img
                                              :src="speaker.pic_link"
                                              alt="Speaker"
                                            >
                                          </v-avatar>
                                        </v-row>
                                        <v-row justify="space-around">
                                          <v-card-title
                                            class="text-center"
                                          >
                                            {{ getSpeakerName(speaker) }}
                                          </v-card-title>
                                        </v-row>
                                        <v-row justify="space-around">
                                          <v-card-text
                                            class="text-center"
                                          >
                                            {{ speaker.bio }}
                                          </v-card-text>
                                        </v-row>
                                      </v-card>
                                    </v-tab-item>
                                  </v-tabs-items>

                                </div>
                              </v-expand-transition>

                            </v-card>
                          
                          </v-dialog>
                        </v-card-actions>

                    </v-card>

                    <!-- <v-card
                        color="primary"
                        class="elevation-2"
                    >
                        <v-card-title class="text-h4 white--text">{{ event.name }}</v-card-title>
                        <v-card-text class="white--text">{{ event.desc }}</v-card-text>
                        
                    </v-card> -->
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
        speaker_tab: 0,
        show_desc: true,
        show_time: true,
        show_speakers: true,
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
          const room_res = await this.$axios.get(`http://127.0.0.1:8000/api/rooms`, { params: {id: ev['room']}})
          ev['room_name'] = room_res.data[0].name
          switch (ev.type) {
            case "TK":
              //   Ponencia
              ev['brief'] = 'Ponencia' //  - ¿Quieres aprender algo nuevo? ¡TryIT!
              // ev['color'] = 'blue darken-1'
              ev['color'] = 'blue'
              ev['icon'] = 'mdi-account-voice'
            break;
            case "WS":
              //   Taller
              ev['brief'] = 'Taller' //  - ¿Quieres mejorar tus habilidades técnicas? ¡TryIT!
              // ev['color'] = 'grey darken-3'
              ev['color'] = 'grey'
              ev['icon'] = 'mdi-hammer-wrench'
            break;
            case "LT":
              //   Lightning Talk
              ev['brief'] = 'Lightning Talk' //  - ¿Cómo? ¿Que no es posible aprender algo en 30 minutos? ¡TryIT!
              // ev['color'] = 'blue lighten-2'
              ev['color'] = 'amber'
              ev['icon'] = 'mdi-timer-outline'
            break;
            case "SP":
              //   Especial
              ev['brief'] = 'Especial' //  - Solo nuestros señores reptilianos saben que ocurrirá aquí...
              // ev['color'] = 'green lighten-1'
              ev['color'] = 'green'
              ev['icon'] = 'mdi-alien'
            break;
            case "TO":
              //   Torneo
              ev['brief'] = 'Concurso' //  - ¡Donde el TryHardeo tiene premio!
              // ev['color'] = 'purple darken-1'
              ev['color'] = 'purple'
              ev['icon'] = 'mdi-bullseye-arrow'
            break;
            default:
              // Unknown Type
              // @info Easter Eggs de Halo por si alguien en un futuro está mirando esto y lo está pasando mal
              // - @PrinceKiwii
              ev['title'] = "ERROR: Wake up, Chief. I need you."
              ev['desc'] = "ERROR: Don't make a girl a promise... if you know you can't keep it. "
              ev['brief'] = "ERROR: It's been an honor serving with you, John."
              ev['color'] = 'red'
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
    async showInfo(index) {
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
    dateToTimeStr(dateString) {
      
      // 2022-02-20T19:00:00Z
      const newDate = new Date(Date.parse(dateString.slice(0, -1)))
      var timeString = newDate.toLocaleTimeString('es-ES')
      timeString = timeString[0].toUpperCase() + timeString.substring(1) // First Letter in Mayus

      return `${timeString}`
    },
    getSubtitle(event) {
        var txt = "" + event.brief

        if(event['speakers'].length != 0) {
          txt += " de "
          for (const sp of event['speakers']) {
            
            txt += this.getSpeakerName(sp) + ", "
          }
  
          txt = txt.slice(0, -2) // Borramos las ultimas 2 comas
        }

        txt += " en " + event['room_name']

        return txt

    },
    getSpeakerName(speaker) {
      var txt = speaker['first_name'] + " " + speaker['surname_1']
      if (speaker['surname_2']) txt += " " + speaker["surname_2"]
      return txt
    }
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