<template>
    <p>{{this.secondsLeft}}</p>
</template>

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
    /*mounted()   {
        this.secondsLeft = (new Date("2022-03-14T10:00:00+01:00").getTime() - Date.now())/1000;  
    },*/
    watch:  {
        counter:    {
            handler(val)    {
                if(val > 0) {
                    setTimeout(() => {
                        this.secondsLeft--;
                    }, 1000)
                }
            }
        }
    }
}
</script>