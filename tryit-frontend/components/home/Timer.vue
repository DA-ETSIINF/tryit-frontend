<template>
    <div class="corchete"><p>{</p><div class="grid">
        <h3 class="timer_intro"> ¿Estás listo?</h3>
        <div class="timer_class">
            <div class="time">{{timer.days}}</div><p>D</p> <div class="time">{{timer.hours}}</div> <p>H</p> <div class="time">{{timer.minutes}}</div> <p>M</p> <div class="time">{{timer.seconds}}</div> <p>S</p>
        </div>
    </div><p>}</p>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Supermercado+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&display=swap');

.corchete   {
    font-size: 20vw;
    font-family: 'Fira Code', monospace;
}

.grid   {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    box-shadow: 0px 0px 15px white;
    outline: solid rgba(255,255,255,0.5);
}

.time   {
    font-size: 10vw;
    /*font-family: 'Supermercado One', cursive;*/
    font-family: 'Fira Code', monospace;
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
