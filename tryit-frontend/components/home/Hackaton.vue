<template>
  <div v-if="isHackatonVisible">
    <h2>HACK IT!</h2>
    <v-dialog v-model="isHackatonVisible" max-width="600px" fullscreen>
      <v-card>
        <v-toolbar color="primary" dark flat>
          <v-avatar>
            <v-img src="/img/Logotipo_PNG_Blanco_2.png"></v-img>
          </v-avatar>
          <v-spacer></v-spacer>
          <v-toolbar-title>HACK IT!</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn fab color="close" small @click="hideDialog">
            <v-icon medium>mdi-close</v-icon>
          </v-btn>
          <template v-slot:extension></template>
        </v-toolbar>

        <!-- Se elimina la parte de "Más información" y el iframe del PDF,
             insertándose el contenido HTML convertido -->
        <div class="custom-content">
          <div class="container">
            <h1>HACK IT!</h1>
            <h2>Bases del concurso</h2>
            <div class="download-container" style="text-align: center; margin-top: 20px;">
              <v-btn color="primary" :href="'/HackIt_Bases_del_Concurso.pdf'" download>
                <v-icon left>mdi-download</v-icon>
                Descargar PDF
              </v-btn>
            </div>
            <nav>
              <h3>Índice</h3>
              <ol>
                <li><a href="#objetivo">Objetivo del Concurso</a></li>
                <li><a href="#requisitos">Requisitos de Participación</a></li>
                <li><a href="#formato">Formato y Dinámica del Concurso</a></li>
                <li><a href="#criterios">Criterios de Evaluación y Puntuación</a></li>
                <li><a href="#reglas">Reglas Generales</a></li>
                <li><a href="#premios">Premios y Reconocimientos</a></li>
                <li><a href="#fecha">Fecha y Lugar del Evento</a></li>
                <li><a href="#inscripcion">Inscripción</a></li>
                <li><a href="#consideraciones">Consideraciones Finales</a></li>
              </ol>
            </nav>

            <h2 id="objetivo">1. Objetivo del Concurso</h2>
            <p>El Hack IT! es un Hackathon que va a tener lugar en el Congreso Try IT! de 2025. Se trata de una
              competición de
              programación competitiva orientada a resolver problemas complejos dentro de un marco temático determinado.
              Los
              participantes deberán desarrollar soluciones eficientes en un tiempo limitado, evaluadas mediante un
              sistema de
              jueces automáticos.</p>

            <h2 id="requisitos">2. Requisitos de Participación</h2>
            <ul>
              <li>Podrán participar estudiantes de Grado o Máster de cualquier escuela de la Universidad Politécnica de
                Madrid
                (UPM) en equipos de 3 a 5 integrantes.</li>
              <li>Se recomienda que los equipos sean multidisciplinarios, aunque no es obligatorio.</li>
            </ul>

            <h2 id="formato">3. Formato y Dinámica del Concurso</h2>
            <ul>
              <li>Se propondrá un conjunto de problemas alineados con temáticas de ciencias de la computación,
                ingeniería,
                salud, fintech, movilidad, entre otras.</li>
              <li>Cada equipo deberá programar soluciones en el lenguaje de programación permitido por la organización.
              </li>
              <li>
                Se contará con un sistema de jueces automáticos que evaluará las soluciones enviadas en función de:
                <ul>
                  <li>Correctitud de la solución (si pasa todas las pruebas proporcionadas por el juez automático).</li>
                  <li>Complejidad temporal (tiempo de ejecución de la solución).</li>
                  <li>Tiempo total de envío (en caso de empate en número de pruebas superadas, se priorizará la rapidez
                    de
                    entrega).</li>
                </ul>
              </li>
            </ul>

            <h2 id="criterios">4. Criterios de Evaluación y Puntuación</h2>
            <ul>
              <li>Cada problema tendrá un puntaje basado en su dificultad y el número de casos de prueba superados.</li>
              <li>
                La puntuación total se calculará según el multiplicador de nivel académico del equipo:
                <ul>
                  <li>Primer curso: x1.5</li>
                  <li>Segundo curso: x1.4</li>
                  <li>Tercer curso: x1.2</li>
                  <li>Cuarto, quinto curso o máster: x1.0</li>
                </ul>
              </li>
              <li>El curso del equipo se define por el nivel más alto de sus integrantes.</li>
            </ul>

            <h2 id="reglas">5. Reglas Generales</h2>
            <ul>
              <li>No se permitirá la comunicación entre equipos.</li>
              <li>Cualquier intento de plagio o fraude resultará en la descalificación inmediata del equipo.</li>
              <li>El evento contará con un comité de supervisión encargado de resolver cualquier disputa o problema que
                pueda
                surgir.</li>
              <li>La participación se llevará a cabo de manera presencial. No se tendrán en cuenta las pruebas
                entregadas de
                equipos que no asistan al congreso.</li>
            </ul>

            <h2 id="premios">6. Premios y Reconocimientos</h2>
            <ul>
              <li>Se otorgarán premios a los tres primeros equipos con mayor puntuación.</li>
              <li>Ganarás 0,5 ECTS y un diploma solo por participar.</li>
              <li>Los ganadores recibirán reconocimientos y posibles incentivos proporcionados por las empresas
                colaboradoras.
              </li>
              <li>Además, se crearán distintos ránkings por prueba, permitiéndole a los equipos ganadores ser
                contactados
                directamente por las empresas organizadoras de dicha prueba.</li>
            </ul>

            <h2 id="fecha">7. Fecha y Lugar del Evento</h2>
            <ul>
              <li>El Hack IT! se llevará a cabo durante el congreso Try IT! en la ETSI Informáticos de la UPM, en la
                Edición
                XIII (2025).</li>
              <li>
                La organización de las pruebas será la siguiente:
                <ul>
                  <li>Prueba 1. Jueves 20 de 10:00 a 12:00</li>
                  <li>Prueba 2. Jueves 20 de 17:00 a 19:00</li>
                  <li>Prueba 3. Viernes 21 de 10:00 a 12:00</li>
                  <li>Final. Sábado 22 de 11:00 a 13:00</li>
                </ul>
              </li>
              <li>Solo tendrán que asistir a la final los 5 primeros equipos.</li>
            </ul>

            <h2 id="inscripcion">8. Inscripción</h2>
            <ul>
              <li>
                La inscripción será gratuita y se realizará a través del siguiente formulario en línea, publicado además
                en la
                web del congreso:
                <a href="https://tryit.upm.es/" target="_blank">https://tryit.upm.es/</a>
              </li>
              <li>
                <a href="https://forms.gle/gzC8VftHZPpC3sWu6" target="_blank">https://forms.gle/gzC8VftHZPpC3sWu6</a>
              </li>
              <li>Todos los miembros de un equipo deberán rellenar el formulario por separado.</li>
              <li>La fecha límite para inscribirse será el 18 de marzo de 2025.</li>
            </ul>

            <h2 id="consideraciones">9. Consideraciones Finales</h2>
            <ul>
              <li>La organización se reserva el derecho de modificar las bases del concurso en caso de ser necesario,
                notificándolo con suficiente antelación.</li>
              <li>La participación en el evento implica la aceptación de estas bases y normas.</li>
              <li>
                <a href="https://forms.gle/gzC8VftHZPpC3sWu6" target="_blank">https://forms.gle/gzC8VftHZPpC3sWu6</a>
              </li>
            </ul>


          </div>
        </div>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHackatonVisible: false
    };
  },
  methods: {
    hideDialog() {
      this.isHackatonVisible = false;
    }
  },
  created() {
    this.$nuxt.$on("toggleHackaton", () => {
      this.isHackatonVisible = !this.isHackatonVisible;
    });
  }
};
</script>

<style scoped>
/* Estilos para el contenido convertido del PDF */
.custom-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  max-width: 800px;
  margin: 20px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1,
h2,
h3,
p {
  margin: 0 0 1em;
}

h1 {
  font-size: 2em;
  text-align: center;
  margin-bottom: 0.5em;
}

h2 {
  font-size: 1.5em;
  margin-top: 1.5em;
}

p {
  margin-bottom: 1em;
}

ul {
  margin: 0 0 1em 20px;
  padding: 0;
  list-style-type: disc;
}

ul ul {
  list-style-type: circle;
  margin-left: 20px;
}

a {
  color: #007BFF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

nav {
  margin-top: 2em;
  padding-top: 1em;
  border-top: 1px solid #ddd;
}

nav ol {
  padding-left: 20px;
}

nav li {
  margin-bottom: 0.5em;
}

@media screen and (max-width: 600px) {
  .container {
    padding: 15px;
    margin: 10px;
  }

  h1 {
    font-size: 1.75em;
  }

  h2 {
    font-size: 1.3em;
  }
}
</style>
