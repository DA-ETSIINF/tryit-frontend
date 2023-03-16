<template>
  <v-app>
    <!-- v-app-bar color="light-blue"> </v-app-bar -->
    <v-main>
      <v-container>
        <v-card>
          <!-- v-carousel
            cycle
            interval="5250"
            hide-delimiters
            show-arrows="hover"
            progress="primary"
            delimiter-icon="mdi-square"
          -->
          <v-carousel
            cycle
            interval="6250"
            hide-delimiters
            progress
            delimiter-icon="mdi-square"
          >
            <!-- Componente que sale si falla al cargar -->
            <v-carousel-item v-if="loading">
              <v-img
                lazy-src="https://congresotryit.es/img/spot.jpg"
                height="100%"
                cover
              >
                <div class="d-flex align-top justify-center fill-height">
                  <v-progress-linear
                    color="indigo lighten-3"
                    indeterminate
                  ></v-progress-linear></div
              ></v-img>
            </v-carousel-item>
            <v-carousel-item class="main" v-for="(obj, i) in TryITs" :key="i">
              <v-img
                v-if="
                  TryITs[i].displayLogo == null || TryITs[i].displayLogo == true
                "
                :src="TryITs[i].image"
                height="100%"
                cover
                @click="TryITs[i].active = true"
              >
                <v-container fluid class="logo">
                  <v-img src="/img/imagotipo_claro_2.png">
                </v-img>
              </v-container>
                <v-container fluid class="year">
                  {{ obj.year }}
                </v-container>
              </v-img>

              <v-img
                v-else
                :src="TryITs[i].image"
                height="100%"
                cover
                @click="TryITs[i].active = true"
              >
              </v-img>

              <v-dialog
                v-model="TryITs[i].active"
                transition="scale-transition"
                max-width="82%"
                max-height="90%"
              >
                <v-card class="content-display">
                  <v-img
                    v-if="
                      !TryITs[i].topImage == null || !TryITs[i].topImage == ''
                    "
                    class="text-white"
                    height="300"
                    :src="TryITs[i].topImage"
                    scale-down
                  >
                    <v-toolbar
                      class="align-top"
                      color="rgba(0, 0, 0, 0.3)"
                      theme="dark"
                      flat
                      rounded="1"
                      collapse
                    >
                      <!-- template v-slot:prepend -->
                      <v-btn icon dark @click="obj.active = false">
                        <v-icon size="180%">mdi-close</v-icon>
                      </v-btn>
                      <!-- /template -->
                    </v-toolbar>
                    <v-card-title class="title"
                      >Try IT! {{ TryITs[i].year }}</v-card-title
                    >
                  </v-img>
                  <v-img
                    v-else
                    class="text-white"
                    height="300"
                    :src="TryITs[i].image"
                    cover
                  >
                    <v-toolbar
                      class="align-top"
                      color="rgba(0, 0, 0, 0.3)"
                      theme="dark"
                      flat
                      rounded="1"
                      collapse
                    >
                      <!-- template v-slot:prepend -->
                      <v-btn icon dark @click="obj.active = false">
                        <v-icon size="180%">mdi-close</v-icon>
                      </v-btn>
                      <!-- /template -->
                    </v-toolbar>
                    <v-card-title class="title"
                      >Try IT! {{ TryITs[i].year }}</v-card-title
                    >
                  </v-img>

                  <!-- Este apaño de "left" está hecho para centrar el texto sin importar la proporción del mismo (razón por la que uso porcentajes en la mayor parte de las propiedades "size", "width", etc.). -->
                  <div
                    v-for="(ent, j) in TryITs[i].body"
                    :key="j"
                    style="width: 75%; position: relative; left: 11%"
                  >
                  
                    <v-card-title
                      v-if="!ent.subtitle == '' || !ent.subtitle == null"
                      class="subtitle pt-4"
                    >
                      {{ ent.subtitle }}
                    </v-card-title>
                    <v-card-text
                      v-if="!ent.link == null || !ent.link == ''"
                      class="reference"
                    >
                      <a :href="ent.link">{{ ent.pgrph }}</a>
                    </v-card-text>
                    <v-card-text v-else class="description">
                      {{ ent.pgrph }}
                    </v-card-text>
                    <v-container v-if="!ent.img == '' || !ent.img == null" fluid>
                    <v-img
                      :src="ent.img"
                      aspect-ratio="2"
                      cover
                      class="bg-grey-lighten-2 sample_img"
                    ></v-img>
                  </v-container>
                  </div>
                </v-card>
              </v-dialog>
            </v-carousel-item>
          </v-carousel>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
@import url("https://fontlibrary.org//face/now");
@import url("https://fonts.cdnfonts.com/css/lovelo");

.content-display {
  width: auto;
  justify-self: center;
}

.main {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-areas:
    "logo"
    "year";
  grid-template-columns: 4fr;
  grid-template-rows: 50% 50%;
  cursor: pointer;
}
.main > div {
  border: 1px dashed #888;
}

.logo {
  grid-area: logo;
  width: auto;
  height: auto;
  max-height: 50%;
  margin-left: 10%;
  margin-right: 10%;
}
.year {
  grid-area: year;
  font-family: Verdana, Geneva, sans-serif;
  min-height: 50%;
  font-size: 270%;
  letter-spacing: -0.6px;
  word-spacing: 0px;
  color: #1b8dcd;
  font-weight: 700;
  text-decoration: none;
  font-style: normal;
  font-variant: normal;
  text-transform: none;
  text-align: center;
  bottom: 10%;
}
.title {
  display: block;
  font-family: "Lovelo";
  flex: none;
  color: rgb(255, 255, 255);
  font-size: 1.25rem;
  font-weight: 500;
  hyphens: auto;
  letter-spacing: 0.0125em;
  min-width: 0;
  overflow-wrap: normal;
  overflow: hidden;
  padding: 0.5rem 1rem;
  text-overflow: ellipsis;
  text-transform: none;
  white-space: nowrap;
  word-break: normal;
  word-wrap: break-word;
}
.subtitle {
  opacity: 0.6;
  font-family: "NowBold";
  justify-content: center;
}
.description {
  /*font-family: "NowRegular";*/
  font-size: 17px;
  line-height: 19px;
  text-align: center;
}
.reference {
  font-family: "NowRegular";
  font-size: 17px;
  line-height: 19px;
  text-align: center;
  cursor: pointer;
}
.sample_img {
  max-height: 50%;
  max-width: 50%;
  position: relative;
  left: 25%;
}
.v-card .v-card-text {
  line-height: 0.25rem;
}
</style>

<script>
// import axios from "axios";
import datos from "..\\..\\assets\\data\\history.json";

export default {
  // Variables y objetos
  data() {
    return {
      TryITs: [], // Se llama desde api, array de objetos con información de otros TryIT!
      loading: true, // Pequeño apaño para que el carrusel no muestre un objeto en blanco al principio (al esperar a la función asíncrona fetchData())
    };
  },

  // Métodos del componente
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    /**
     * Función para cambiar un boolean a falso.
     *
     * @param obj booleano que se desea cambiar a falso cuando un evento ocurre (click outside event)
     */
    onClickOutside(obj) {
      obj.active = false;
    },

    /**
     * Función que llama a la api para sacar el valor de los TryIT! anteriores.
     */
    async fetchData() {
      try {
        //const res = await axios.get("http://localhost:5000/data/history");
        this.TryITs = datos.tryits;
      } catch (err) {
        console.error(err);
      } finally {
        this.loading = this.TryITs.length == 0 ? true : false; // Finalmente ya se puede quitar el loading placeholder si se ha cargado el componente correctamente.
        //  if (!this.loading) {
        //     this.sleep();
        //     this.fetchData();
        //  }
      }
    },
  },

  //Funciónes y parámetros que se ejecutan cuando la página carga.
  created() {
    this.fetchData();
  },
};
</script>
