<template>
    <div>
        <div class="grid">
            
            <div class="timer_class">
                <table>
                    <thead>
                        <tr>
                            <td colspan="4">
                                <img class="tryit-logo" src="/img/imagotipo_claro_2.png"/>
                            </td>
                        </tr>

                        <tr>
                            <td colspan="4">
                                <h2> { 14 a 18 de Marzo de 2022 } </h2>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="time">{{timer.days}}</div>
                            </td>
                            <td>
                                <div class="time">{{timer.hours}}</div> 
                            </td>
                            <td>
                                <div class="time">{{timer.minutes}}</div>
                            </td>
                            <td>
                                <div class="time">{{timer.seconds}}</div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <p>Días</p>
                            </td>
                            <td>
                                <p>Horas</p>
                            </td>
                            <td>
                                <p>Minutos</p>
                            </td>
                            <td>
                                <p>Segundos</p>
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

.tryit-logo	{
	height: auto;
	width: 20vw;
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
}

.timer_class *{
    margin: auto;
    color: var(--primary-9);
    border: 50px;
    border-color: rgba(82, 78, 78, 0.75);
    padding: 0.5vw;
    text-align: center; 
    
}

.timer_class p  {
    font-size: 1.5vw;
    font-family: 'Fira Code', monospace;
}

.timer_class h2  {
    font-size: 2.5vw;
    font-family: 'Fira Code', monospace;
    font-weight: 700;
    color: var(--primary-9);
    text-shadow: 1px 1px 1px rgb(0, 0, 0);

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
