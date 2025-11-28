<template>
    <div>
      <div class="grid">
        <div class="timer_class">
          <table>
            <thead>
              <tr>
                <td colspan="7">
                  <img class="tryit-logo" src="/img/imagotipo_claro_2.png" />
                </td>
              </tr>
              <tr>
                <td colspan="7">
                  <h2>¡Ya ha empezado la cuenta atrás!</h2>
                   <!-- <h2>¡Ya ha empezado el Tryit!</h2> -->
                   <!--<h1>Dia viernes 21 cancelado por riesgo de lluvias</h1>
                   <h5>Por la situación meteorológica, no se realizarán las actividades programadas para el dia 21 de marzo. Sentimos mucho las molestias que esto haya podido causar. - Comité Organizador del XIII TryIT!</h5>-->
                </td>
              </tr>
            </thead>
            <tbody>
              
            <template v-if="!tryitEnded">
                
                <tr v-if="secondsLeft > 0">
                  <td>
                    <div class="time">{{ timer.days }}</div>
                  </td>
                  <td><p>:</p></td>
                  <td>
                    <div class="time">{{ timer.hours }}</div>
                  </td>
                  <td><p>:</p></td>
                  <td>
                    <div class="time">{{ timer.minutes }}</div>
                  </td>
                  <td><p>:</p></td>
                  <td>
                    <div class="time">{{ timer.seconds }}</div>
                  </td>
                </tr>
                
                <tr v-else>
                  <td colspan="7">
                    <h2>{{ message }}</h2>
                  </td>
                </tr>
              </template>
              
              <template v-else>
                <tr>
                  <td colspan="7">
                    <h2>el tryit terminó nos vemos el año que viene</h2>
                  </td>
                </tr>
                <tr>
                  <td colspan="7">
                    <div class="time">próximamente</div>
                  </td>
                </tr>
              </template>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="7">
                  <h2>16 al 20 de Marzo de 2026</h2>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');
  
  @font-face {
    font-family: 'Lovelo-Black';
    src: local('Lovelo-Black'), url('https://c.webfontfree.com/c.js?f=Lovelo-Black') format('truetype');
  }
  
  /* Usar la fuente en el CSS */
  .timer_class h2 {
    font-family: 'Lovelo-Black', sans-serif;
    font-weight: normal;
  }
  
  .tryit-logo {
    height: auto;
    width: 20vw;
  }
  
  table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
  }
  
  td {
    text-align: center;
    vertical-align: middle;
    margin: 0;
  }
  
  .grid {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    box-shadow: 0px 0px 15px white;
    outline: solid rgba(255, 255, 255, 0.5);
    background-color: rgba(20, 20, 20, 0.3);
  }
  
  .time {
    font-size: 8vw;
    font-family: 'Fira Code', monoespace;
    font-weight: 700;
    margin: 0;
    padding: 0;
    line-height: 1;
    display: inline-block;
  }
  
  .timer_intro {
    text-align: center;
    font-size: 5vw;
    color: white;
  }
  
  .timer_class {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 5px;
    justify-content: center;
    align-items: center;
    max-height: auto;
    max-width: 100%;
  }
  
  .timer_class * {
    margin: auto;
    color: var(--primary-9);
    border: 50px;
    border-color: rgba(82, 78, 78, 0.75);
    padding-top: 0.2vw;
    padding-right: 0.5vw;
    padding-bottom: 0.2vw;
    padding-left: 0.5vw;
    text-align: center;
  }
  
  .timer_class p {
    font-size: 8vw;
    margin: 0;
    padding: 0;
    line-height: 1;
    display: inline-block;
  }
  
  .timer_class h2 {
    font-size: 2.5vw;
    font-family: 'Lovelo-Black', sans-serif;
    font-weight: 700;
    color: var(--primary-9);
    text-shadow: 1px 1px 1px rgb(0, 0, 0);
  }
  </style>
  
  <script lang="ts">
  import { TimerType } from "../../types/components/TimerType";
  import Vue from "vue";
  
  export default Vue.extend({
    data() {
      return {
        // Calcula la diferencia en segundos entre la fecha de inicio (17 de marzo de 2025 a las 11:00)
        // y el momento actual.
        secondsLeft: (new Date("2026-03-16T11:00:00+01:00").getTime() - Date.now()) / 1000,
        currentDay: 1, // Día actual (del 1 al 6)
        message: "",
        tryitEnded: false // Flag para indicar que ya finalizó el tryit
      };
    },
    computed: {
      timer(): TimerType {
        // Retorna el objeto TimerType que formatea los segundos restantes.
        return new TimerType(this.secondsLeft);
      }
    },
    mounted() {
      this.startTimer();
    },
    methods: {
      startTimer() {
        setInterval(() => {
          // Si el tryit ya terminó no se actualiza nada
          if (this.tryitEnded) {
            return;
          }
          if (this.secondsLeft > 0) {
            this.secondsLeft--;
          } else {
            // Si la cuenta llega a 0
            if (this.currentDay < 6) {
              // Para los días 1 a 5, se muestra el mensaje del día y se reinicia el timer a 24h
              const now = new Date();
              const hours = now.getHours().toString().padStart(2, '0');
              const minutes = now.getMinutes().toString().padStart(2, '0');
              const seconds = now.getSeconds().toString().padStart(2, '0');
              const formattedTime = hours + ":" + minutes + ":" + seconds;
              this.message = "Día " + this.currentDay + " del tryit - " + formattedTime;
              this.currentDay++;
              // Reinicia el timer para el siguiente día (24 horas = 86400 segundos)
              this.secondsLeft = 86400;
            } else {
              // Cuando se termina el día 6 (22 de marzo de 2025)
              // Se muestra el mensaje final y se detiene el contador
              this.tryitEnded = true;
            }
          }
        }, 1000);
      }
    }
  });
  </script>
  
