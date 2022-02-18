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
                v-for="post in posts"
                :key="post.start_date"
                small
                fill-dot
            >
                <v-card
                    :color="black"
                    class="white--text"
                >
                    {{post.end_date}}
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
import $http from 'http'
export default {
    data()  {
        return{
          posts: [],
          isVisible: false,
          year: 2022,
          emailRules: [ v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/.test(v) || 'Introduzca un email válido' ],
          items:    [{
              id: 1,
              color: "primary",
              icon: "mdi-user",
              text: "Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae."
          },
          {
              id: 2,
              color: "primary",
              icon: "mdi-user",
              text: "Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae."
          },
          {
              id: 3,
              color: "primary",
              icon: "mdi-user",
              text: "Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae."
          },
          {
              id: 4,
              color: "primary",
              icon: "mdi-user",
              text: "Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae."
          },
          {
              id: 5,
              color: "primary",
              icon: "mdi-user",
              text: "Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae."
          },]
        }
    },
    async fetch() {
      //const posts = await $http.$get(`${process.env.api}/${year}/talks`).json()
      this.posts = await this.$axios.$get(`http://192.168.1.14:3000/test.json`).then(res => res)
      console.log("Data loaded")
      //return { posts }

      /*posts.forEach(post => {
        let formattedPost = {
          event: post.event,
          url: post.url,
          video: post.video,
          start: post.start_date,
          end: post.end_date,
          slide: post.slide,
          room: post.room
        }
        formattedPosts.push(formattedPost)
      });
  */
    },
    methods: {
      hideDialog()  {
        this.isVisible = false
      }
    },
    created() {
      this.$nuxt.$on("toggleTimeline", () => {
        this.isVisible = !this.isVisible
      })
    }
  }
</script>