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
                    class="black--text"
                >
                    {{post.event.name}}
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