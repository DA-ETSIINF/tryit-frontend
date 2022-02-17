<template>
    <v-speed-dial
        v-model="showIcons"
        :top="top"
        :bottom="bottom"
        :right="right"
        :left="left"
        :direction="direction"
        :open-on-hover="hover"
        :transition="transition"
        fixed
    >
        <template v-slot:activator>
        <v-btn
            v-model="showIcons"
            color="secondary"
            dark
            fab
        >
            <v-icon v-if="showIcons">
            mdi-close
            </v-icon>
            <v-icon v-else>
            mdi-plus
            </v-icon>
        </v-btn>
        </template>
        <v-btn
        fab
        dark
        small
        color="blue-grey darken-3"
        @click="hideTicketForm"
        >
        <v-icon>mdi-form-select</v-icon>
        </v-btn>
        <v-btn
        fab
        dark
        small
        color="blue-grey darken-3"
        @click="hideTimeline"
        >
        <v-icon>mdi-timeline</v-icon>
        </v-btn>
    </v-speed-dial>
</template>

<script>
export default {
    data()  {
        return{
            showIcons: false,
            top:false,
            bottom:true,
            right:true,
            left:false,
            direction:"top",
            hover:false,
            transition:"slide-y-reverse-transition"
        }
    },
    methods:    {
        hideTicketForm()    {
            this.$nuxt.$emit("toggleTicketForm")
        },
        hideTimeline()    {
            this.$nuxt.$emit("toggleTimeline")
        }
    }
}
</script>

