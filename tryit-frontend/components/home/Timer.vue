<template>
    <div>
        <h3 class="timer_intro"> ¿Estás listo? Te esperamos en</h3>
        <p class="timer_class">{{timer}}</p>
    </div>
</template>

<style lang="scss">
    @import './Timer.scss'
</style>

<script lang="ts">
/*import { Component, Provide, Inject, Vue } from "nuxt-property-decorator";

const start: number = new Date("2022-03-14T10:00:00+01:00").getTime();

@Component({})
export default class Timer extends Vue  {
    //let curr: number = Date.now();
    

    @Inject(curr) readonly curr;
    @Inject(start) readonly start;
    @Provide() curr = Date.now();
    data()  {
        return  {

        }
    }
}*/

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
        formatTime(seconds) {
            if(seconds > 0) {
                setTimeout(() => {
                    this.secondsLeft--;
                }, 1000)
            }

            var days: number = Math.floor(seconds / (3600 * 24));
            seconds = seconds % (3600 * 24);
            var hours: number = Math.floor(seconds / 3600);
            seconds = seconds % 3600;
            var mins: number = Math.floor(seconds / 60)
            seconds = Math.floor(seconds % 60);
            return `${days} días ${hours} horas ${mins} minutos ${seconds} segundos`; //.substr(11, 8);
        }
    }
    /*mounted()   {
        this.secondsLeft = (new Date("2022-03-14T10:00:00+01:00").getTime() - Date.now())/1000;  
    },*/
    /*watch:  {
        counter:    {
            handler(val)    {
                if(val > 0) {
                    setTimeout(() => {
                        this.secondsLeft--;
                    }, 1000)
                }
            }
        }
    }*/
}
</script>