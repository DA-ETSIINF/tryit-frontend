<template>
    <div>
        <h3 class="timer_intro"> ¿Estás listo? Te esperamos en</h3>
        <div class="timer_class"><div>{{timer.days}}</div><p>días</p> <div>{{timer.hours}}</div> <p>horas</p> <div>{{timer.minutes}}</div> <p>minutos</p> <div>{{timer.seconds}}</div> <p>segundos</p></div>
    </div>
</template>

<style scoped>
.timer_intro {
    text-align: center;
    font-size: 2em;
    color: white;
}

.timer_class {
    display: flex;
    flex-direction: row;
    margin: 10px;
    justify-content: center;
    align-items: center;
    max-height: 60%;
    max-width: 60%;
}

.timer_class *{
    margin: auto;
    font-size: 20px;
    color: white;
    text-shadow: 0 0 30px rgba(82, 78, 78, 0.75);
    border: 50px;
    border-color: rgba(82, 78, 78, 0.75);
    padding: 10px;
}
</style>

<script lang="ts">
import {
  TimerType
} from "../../types/components/TimerType";
export default  {
    data()  {
        return{
            secondsLeft :  (new Date("2022-03-14T10:00:00+01:00").getTime() - Date.now())/1000,
        }
    },
    computed:   {
        timer() {
            let secs = this.secondsLeft;
            return this.formatTime(secs)
        }
    },
    methods:    {
        formatTime(seconds): TimerType {
            if(seconds > 0) {
                setTimeout(() => {
                    this.secondsLeft--;
                }, 1000)
            }
            let days: number;
            let time: TimerType = new TimerType(seconds);
           
            return time; //.substr(11, 8);
        }
    }

}
</script>
