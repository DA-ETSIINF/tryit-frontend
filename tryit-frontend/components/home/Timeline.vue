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
      
        <v-timeline>
            <v-slide-x-reverse-transition
            group
            hide-on-leave
            >
            <v-timeline-item
                v-for="(post,index) in posts"
                :key="post.event.id"
                small
                fill-dot
            >
                <v-card
                    color="indigo accent-2"
                >
                    <v-card-title class="white--text">{{post.event.name}}</v-card-title>
                    <v-card-subtitle class="white--text">{{post.event.eventtype}} located at {{post.room}}</v-card-subtitle>
                    <v-card-text class="white black--text" v-show="show.includes(index)">{{post.event.description}}</v-card-text>
                    <v-card-actions>
                      <v-btn @click="showInfo(index)">VER INFO</v-btn>
                    </v-card-actions>
                    <v-card-text class="white--text">Oradores: {{getNames(post)}}</v-card-text>
                </v-card>
            </v-timeline-item>
            
            </v-slide-x-reverse-transition>
        </v-timeline>
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
  props: ['posts'],
  data()  {
      return{
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
    getNames(post)  {
      var names = ""
      post.speakers.forEach(function(i, index, speakers)  {
        names += i.name
        if(index != speakers.length - 1)  {
          names += ", "
        }
      });
      return names
    }
  },
  created() {
    this.$nuxt.$on("toggleTimeline", () => {
      this.isVisible = !this.isVisible
    })
  }
}
</script>