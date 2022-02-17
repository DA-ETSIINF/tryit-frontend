<template>
  <!--<v-row justify="center">-->
    <v-dialog
      v-model="isVisible"
      persistent
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
                v-for="item in items"
                :key="item.id"
                :color="item.color"
                small
                fill-dot
            >
                <v-alert
                    :value="true"
                    :color="item.color"
                    :icon="item.icon"
                    class="white--text"
                >
                    {{item.text}}
                </v-alert>
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
    data()  {
        return{
          isVisible: false,
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
    computed:   {
      changeVisibility()  {
        this.isVisible = this.$store.state.isTicketFormVisible
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