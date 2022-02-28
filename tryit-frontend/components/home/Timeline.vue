<template>
  <!--<v-row justify="center">-->
    <v-dialog
      v-model="isVisible"
      max-width="600px"
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
        <v-toolbar
          color="cyan"
          dark
          flat
        >
          <v-toolbar-title>Schedule</v-toolbar-title>

          <v-spacer></v-spacer>

          <template v-slot:extension>
            <v-tabs
              v-model="tab"
              align-with-title
            >
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
                
                <v-timeline-item
                    v-for="(event) in posts[tab].events"
                    :key="event.id"
                    small
                    fill-dot
                >
                    <v-card
                        color="indigo accent-2"
                    >
                        <v-card-title class="white--text">{{ event.name }}</v-card-title>
                        <v-card-subtitle class="white--text">{{ event.start_date }}</v-card-subtitle>
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
    getYearFromStr(dateString) {
      return new Date(dateString).getFullYear()
    },
    getMonFromStr(dateString) {
      const month = new Date(dateString).getMonth()
      switch(month) {
        case 0:
          return "enero"
        case 1:
          return "febrero"
        case 2:
          return "marzo"
        case 3:
          return "abril"
        case 4:
          return "mayo"
        case 5:
          return "junio"
        case 6:
          return "julio"
        case 7:
          return "agosto"
        case 8:
          return "septiembre"
        case 9:
          return "octubre"
        case 10:
          return "noviembre"
        case 11:
          return "diciembre"

      }
    },
    getDayFromStr(dateString) {
      return new Date(dateString).getDay()
    },
    getHoursFromStr(dateString) {
      const hours = new Date(dateString).getHours()
      if(hours < 10) {
        return ("0" + hours)
      }
      return hours
    },
    getMinsFromStr(dateString) {
      const mins = new Date(dateString).getMinutes()
      if(mins < 10) {
        return ("0" + mins)
      }
      return mins
    },
    getSecsFromStr(dateString) {
      return new Date(dateString).getSeconds()
    },
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

