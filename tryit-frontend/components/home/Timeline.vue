<template>
  <!--<v-row justify="center">-->
    <v-dialog
      v-model="isVisible"
      max-width="600px"
      fullscreen
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="secondary"
          dark
          block
          height=30vh
          v-bind="attrs"
          v-on="on"
          @click="hideDialog"
        >
        INFORMACIÓN Y HORARIOS DE LOS EVENTOS
        </v-btn>
      </template>
      
      <v-card>
        <!-- @TODO change so that color isn't hardcoded -->
        <v-toolbar
          color="blue"
          dark
          flat
        >
          <!-- @Todo Center text -->
          <v-toolbar-title>
            Horarios del Evento
            <!-- <v-avatar>
              <v-img src="/img/imagotipo_claro_2.png"></v-img>
            </v-avatar> -->

          </v-toolbar-title>

          <v-spacer></v-spacer>

          <template v-slot:extension>
            <v-tabs
              v-model="tab"
              align-with-title
              next-icon="mdi-arrow-right-bold-box-outline"
              prev-icon="mdi-arrow-left-bold-box-outline"
              show-arrows
              center-active
              dark
            >
        <!-- @TODO change so that color isn't hardcoded -->

              <v-tabs-slider color="yellow"></v-tabs-slider>

              <v-tab
                v-for="post in posts"
                :key="post.day"
              >
                {{ post.day }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="post in posts"
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
                    v-for="(event) in posts[tab].events"
                    :key="event.id"
                    :color="event.color"
                    :icon="event.icon"
                    small
                    fill-dot
                >
                    <v-card
                        color="indigo accent-2"
                    >
                        <v-card-title class="white--text">{{ event.name }}</v-card-title>
                        <v-card-subtitle class="white--text"> {{ dateToStr(event.start_date) }} - {{ dateToStr(event.end_date) }}</v-card-subtitle>
                        <v-card-subtitle class="white--text"> {{ event.desc }}</v-card-subtitle>
                    </v-card>
                </v-timeline-item>
              
              </v-slide-x-reverse-transition>
            </v-timeline>
          </v-tab-item>
        </v-tabs-items>
      </v-card>


        
        <v-btn 
            block 
            color="secondary" 
            @click="hideDialog"
            >CERRAR
        </v-btn>
      
    </v-dialog>
  <!--</v-row>-->
</template>

<script>

export default {
  props: ["posts"],
  data()  {
      return{
        tab: 0,
        isVisible: false,
        show: []
      }
  },
  methods: {
    hideDialog()  {
      this.isVisible = false
    },
    showInfo(index) {
      if(this.show.includes(index)) {
        this.show = this.show.filter(item => item !== index)
      }
      else  {
        this.show.push(index)
      }
    },
    dateToStr(dateString) {
      
      // 2022-02-20T19:00:00Z
      const newDate = new Date(Date.parse(dateString.slice(0, -1)))
      return `${newDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})} ${newDate.toLocaleTimeString('es-ES')}`
    },

    // getYearFromStr(dateString) {
    //   return new Date(dateString).getFullYear()
    // },
    // getMonFromStr(dateString) {
    //   const month = new Date(dateString).getMonth()
    //   switch(month) {
    //     case 0:
    //       return "enero"
    //     case 1:
    //       return "febrero"
    //     case 2:
    //       return "marzo"
    //     case 3:
    //       return "abril"
    //     case 4:
    //       return "mayo"
    //     case 5:
    //       return "junio"
    //     case 6:
    //       return "julio"
    //     case 7:
    //       return "agosto"
    //     case 8:
    //       return "septiembre"
    //     case 9:
    //       return "octubre"
    //     case 10:
    //       return "noviembre"
    //     case 11:
    //       return "diciembre"

    //   }
    // },
    // getDayFromStr(dateString) {
    //   return new Date(dateString).getDay()
    // },
    // getHoursFromStr(dateString) {
    //   const hours = new Date(dateString).getHours()
    //   if(hours < 10) {
    //     return ("0" + hours)
    //   }
    //   return hours
    // },
    // getMinsFromStr(dateString) {
    //   const mins = new Date(dateString).getMinutes()
    //   if(mins < 10) {
    //     return ("0" + mins)
    //   }
    //   return mins
    // },
    // getSecsFromStr(dateString) {
    //   return new Date(dateString).getSeconds()
    // },
  },
  created() {
    this.$nuxt.$on("toggleTimeline", () => {
      this.isVisible = !this.isVisible
    })
  }
}

//  <v-timeline-item
//                 v-for="(post) in posts.events"
//                 :key="post.id"
//                 small
//                 fill-dot
//             >
//                 <v-card
//                     color="indigo accent-2"
//                 >
//                     <v-card-title class="white--text">{{ post.name }}</v-card-title>
//                     <v-card-subtitle class="white--text">{{ getDayFromStr(post.start_date) }} de {{ getMonFromStr(post.start_date) }} 
//                       <br/> 
//                       {{ getHoursFromStr(post.start_date) }}:{{ getMinsFromStr(post.start_date) }} - {{ getHoursFromStr(post.end_date) }}:{{ getMinsFromStr(post.end_date) }}
//                       </v-card-subtitle>
//                     <!--<v-card-text class="white--text">{{ getHoursFromStr(post.start_date) }}:{{ getMinsFromStr(post.start_date) }} - {{ getHoursFromStr(post.end_date) }}:{{ getMinsFromStr(post.end_date) }}</v-card-text>-->
//                     <v-card-text class="white--text">{{ post.type }} en la sala {{ post.room }}</v-card-text>
//                     <!--<v-card-text class="white black--text" v-show="show.includes(index)">{{post.event.description}}</v-card-text>-->
//                     <!--<v-card-actions>
//                       <v-btn @click="showInfo(index)">VER INFO</v-btn>
//                     </v-card-actions>-->
//                     <!--<v-card-text class="white--text">Oradores: {{getNames(post)}}</v-card-text>-->
//                 </v-card>
//             </v-timeline-item>

</script>

