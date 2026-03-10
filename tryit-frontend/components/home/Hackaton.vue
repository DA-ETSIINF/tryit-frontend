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

            <h2 id="objetivo">Objetivo del Concurso</h2>
            <p>El <strong>Hack-IT!</strong> es una competición de programación competitiva que se celebra
            dentro del congreso <strong>Try-IT!</strong> en la Escuela Técnica Superior de Ingenieros
            Informáticos de la Universidad Politécnica de Madrid (UPM).
            </p><p>
            
            El objetivo del evento es que los participantes resuelvan problemas
            algorítmicos y computacionales en un tiempo limitado, desarrollando
            soluciones eficientes que serán evaluadas mediante un sistema
            automático de jueces.
            </p><p>
              La competición busca fomentar:
            </p>
            <ul>
              <li>el pensamiento algorítmico</li>
              <li>la resolución eficiente de problemas</li>
              <li>el trabajo en equipo</li>
              <li>la aplicación práctica de conocimientos de informática</li>
            </ul>
            <p>Los problemas podrán estar inspirados en casos reales de la industria
            tecnológica o en áreas de ciencias de la computación.</p>
            
            <h2 id="requisitos">Requisitos de Participación</h2>
            <p>Podrán participar estudiantes de Grado o Máster de la Universidad
            Politécnica de Madrid (UPM).
            </p><p>
              Los equipos deberán cumplir las siguientes condiciones:
            </p>
            <ul>
              <li>Cada equipo estará formado por <strong>2 o 3 integrantes.</strong></li>
              <li>Los participantes competirán <strong>de forma presencial</strong> en las aulas de
              informática habilitadas para el evento.</li>
              <li>Cada equipo dispondrá de <strong>un único ordenador y monitor </strong> durante
              la competición.</li>
            </ul>

            <h2 id="formato">Formato y Dinámica del Concurso</h2>
            <p>La competición consistirá en la resolución de 5 problemas de
            programación con distintos niveles de dificultad:</p>
            <ul>
              <li>1 problema fácil</li>
              <li>2 problemas intermedios</li>
              <li>2 problemas difíciles</li>
            </ul>
            <p>Al inicio del concurso, cada equipo recibirá un cuadernillo con los
            enunciados, que incluirá una portada con el nombre del equipo.</p>
          
            <p>Las soluciones deberán enviarse a través del sistema DOMjudge, que
            evaluará automáticamente cada programa ejecutándolo sobre una
            batería de casos de prueba. </p>
          
            <p>Las soluciones se evaluarán según:</p>
            <ul>
              <li>Correctitud de la solución (superar los casos de prueba).</li>
              <li>Eficiencia computacional.</li>
              <li>Tiempo de envío de la solución.</li>
            </ul>
          
            <p>Durante la competición solo se permitirá acceder a:</p>
            <ul>
              <li>la plataforma DOMjudge</li>
              <li>la documentación oficial de los lenguajes permitidos.</li>
            </ul>

            <p>Los lenguajes de programación permitidos serán:</p>
            <ul>
              <li>Java</li>
              <li>Python</li>
              <li>C++</li>
              <li>C</li>
            </ul>


            <h2 id="criterios">Evaluación</h2>
            <p>La clasificación seguirá el sistema habitual de programación competitiva.
            Se tendrá en cuenta:</p>
            <ul>
              <li><strong>Número de problemas resueltos correctamente.</strong></li>
              <li><strong>Tiempo total de resolución</strong>, incluyendo penalizaciones por envíos
              incorrectos.</li>
            </ul>
            <p>Con el objetivo de fomentar la participación de estudiantes de distintos
            cursos, se aplicará <strong>un multiplicador según el nivel académico del
            equipo</strong>:</p>
            <ul>
              <li>Primer curso → x1.5</li>
              <li>Segundo curso → x1.4</li>
              <li>Tercer curso → x1.2</li>
              <li>Cuarto curso o máster → x1.0</li>
            </ul>
            <p>El curso del equipo se definirá como el curso más alto entre sus integrantes.</p>

            <h2 id="reglas">Reglas Generales</h2>
            <p>Durante la competición se deberán respetar las siguientes normas:</p>
            <ul>
              <li>No se permitirá la <strong>comunicación entre equipos</strong>.</li>
              <li>Los <strong>teléfonos móviles deberán permanecer apagados</strong> y colocados en un rincón de la mesa.</li>
              <li>Cada equipo utilizará <strong>un único ordenador</strong>.</li>
              <li>El acceso a internet estará <strong>restringido</strong> a la red habilitada en las aulas de informática.</li>
              <li>Solo se podrá acceder a <strong>DOMjudge</strong> y a la documentación oficial de
los lenguajes permitidos.</li>
            </ul>
            <p>Cualquier intento de:</p>
            <ul>
              <li>plagio</li>
              <li>fraude</li>
              <li>acceso a recursos no autorizados</li>
            </ul>
            <p>supondrá la <strong>descalificación inmediata</strong> del equipo.</p>
            <p>La organización contará con <strong>un comité de supervisión</strong> encargado de
            resolver cualquier incidencia o disputa.</p>
            
            <h2 id="inscripcion">Inscripción</h2>
            <p>
              La inscripción será <strong>gratuita</strong> y se realizará a través del formulariopublicado
              en la web del congreso <strong>Try IT!</strong>:
            </p>
            <p>
              <a href="https://forms.gle/gzC8VftHZPpC3sWu6" target="_blank">https://forms.gle/gzC8VftHZPpC3sWu6</a>
            </p>
            <p>Todos los integrantes de un equipo deberán completar el formulario de
            inscripción, además de tener la entrada del Try-IT!
            </p>
            
            <h2 id="fecha">Horario</h2>
            <p>La competición se dividirá en dos sesiones:</p>
            <p>Primera sesión</p>
            <ul>
              <li>10:00 – 12:00</li>
            </ul>
            <p>Segunda sesión</p>
            <ul>
              <li>17:00 – 18:00</li>
            </ul>
            <p>Al finalizar la primera sesión se recogerán <strong>los cuadernillos de problemas</strong>.</p>
            <p>Al inicio de la segunda sesión <strong>se volverán a repartir los cuadernillos</strong> y la
            competición continuará hasta su finalización.</p>

            <h2 id="premios">Premios y Reconocimientos</h2>
            <p>Se otorgarán premios a los<strong> tres equipos </strong>con mayor puntuación.</p>
            <p>Los equipos ganadores podrán recibir:</p>  
            <ul>
              <li>premios proporcionados por las <strong>empresas colaboradoras</strong></li>
              <li>diplomas de participación</li>
              <li>posibles oportunidades de contacto con empresas participantes en el evento</li>
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
