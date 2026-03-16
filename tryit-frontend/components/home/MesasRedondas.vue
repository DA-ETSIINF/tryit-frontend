<template>
  <div v-if="isMesasRedondasVisible">
    <h2>Mesas Redondas</h2>
    <v-dialog v-model="isMesasRedondasVisible" max-width="600px" fullscreen>
        <v-card style="margin:100px;">
        <v-toolbar color="primary" dark flat>
          <v-avatar>
            <v-img src="/img/Logotipo_PNG_Blanco_2.png"></v-img>
          </v-avatar>
          <v-spacer></v-spacer>
          <v-toolbar-title>
            Mesas Redondas
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn fab color="close" small @click="hideDialog">
            <v-icon medium>mdi-close</v-icon>
          </v-btn>
          <template v-slot:extension>
          </template>
        </v-toolbar>

        <section class="contenido_mesas">
          
          <hr>
          <div class="mesas_texto">
            <h3>Mesas Redondas</h3>
            <p>
              Durante toda la semana tendrán lugar mesas redondas entre
              profesionales de empresa 👔💼 y profesores de nuestra universidad 🎓📚. <br><br>
              Una oportunidad única para intercambiar ideas, conocer experiencias del mundo laboral
              y escuchar a expertos debatir sobre temas de interés. ¡No te lo pierdas! 🚀👏
            </p>
          </div>
          <hr> 

          <section class="imagenes_mesas">
            <div v-for="(n, index) in 5" :key="index">
              <v-img 
                :src="`/img/mesas-redondas-imagenes/mesa-redonda${n}.jpeg`" 
                class="responsive-img" 
                contain
              ></v-img>
              <hr v-if="index < 4" />
            </div>
          </section>
          
        </section>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component({})
export default class MesasRedondas extends Vue {
  isMesasRedondasVisible: boolean = false;

  hideDialog() {
    this.isMesasRedondasVisible = false;
  }

  created() {
    this.$nuxt.$on("toggleMesasRedondas", () => {
      this.isMesasRedondasVisible = !this.isMesasRedondasVisible;
    });
  }
}
</script>

<style scoped>
.contenido_mesas {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.mesas_texto {
  max-width: 600px;
}

h3,
p {
  margin: 0 20px;
  text-align: center;
}

hr {
  width: 30%;
  margin: 20px auto;
  border: none;
  height: 5px;
  background-color: #035b9e;
}

.imagenes_mesas {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.responsive-img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  margin: 20px 0; /* Al menos 20px de margen arriba y abajo */
  box-sizing: border-box;
}
</style>
