<template>
    <div><p class="corchete">{</p><div class="grid">
        <!--<h3 class="timer_intro"> ¿Estás listo?</h3>-->
        <div class="timer_class">
            <div class="time">{{timer.days}}</div><p>:</p> <div class="time">{{timer.hours}}</div> <p>:</p> <div class="time">{{timer.minutes}}</div> <p>:</p> <div class="time">{{timer.seconds}}</div>
        </div>
    </div><p class="corchete">}</p>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');

.corchete  {
    font-size: 15vw;
    font-family: 'Fira Code', monospace;
    font-weight: 400;
    color: var(--primary-7);
}

.grid   {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    box-shadow: 0px 0px 15px white;
    outline: solid rgba(255,255,255,0.5);
    background-color: rgba(20,20,20,0.3);
}

.time   {
    font-size: 10vw;
    font-family: 'Fira Code', monospace;
    font-weight: 700;
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
    backdrop-filter: opacity(20%);
}

.timer_class *{
    margin: auto;
    color: var(--primary-8);
    border: 50px;
    border-color: rgba(82, 78, 78, 0.75);
    padding: 10px;
    text-align: center; 
    
}

.timer_class p  {
    font-size: 5vw;
    font-family: 'Fira Code', monospace;

}
</style>

<script lang="ts">
import {
  TimerType
} from "../../types/components/TimerType";
import Vue from "vue";
export default  Vue.extend({
    data()  {
        return{
            secondsLeft :  (new Date("2022-03-14T10:00:00+01:00").getTime() - Date.now())/1000,
        }
    },
    computed:   {
        timer(): TimerType {
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

});
</script>
