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
                        color="indigo accent-2"
                    >
                        <v-card-title class="white--text">{{ event.name }}</v-card-title>
                        <v-card-subtitle class="white--text"> {{ dateToStr(event.start_date) }} - {{ dateToStr(event.end_date) }}</v-card-subtitle>
                        <v-card-text class="white--text">{{ event.desc }}</v-card-text>
                        <v-card-actions>
                          <v-dialog
                            v-model="show[index]"
                            max-width="600px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                color="secondary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                @click="showInfo(index)"
                              >
                              INFORMACIÓN Y HORARIOS DE LOS EVENTOS
                              </v-btn>
                            </template>
                            <v-card>
                              <v-img id="rounded-img" src="https://picsum.photos/id/11/500/300"></v-img>
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
      return `${newDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})} ${newDate.toLocaleTimeString('es-ES')}`
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
#rounded-img  {
    border-radius: 50%; 
}
</style>