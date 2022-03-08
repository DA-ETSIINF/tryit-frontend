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
            mdi-format-list-bulleted-square
            </v-icon>
        </v-btn>
        </template>

        <v-tooltip left :disabled="tooltips[0]" v-model="tooltips[0]">
            <v-btn
            slot="activator"
            fab
            dark
            small
            color="blue-grey darken-3"
            @click="showLoginForm"
            >
            <v-icon>mdi-qrcode</v-icon>
            </v-btn>
            <span>REGISTRO ASISTENCIA</span>
        </v-tooltip>

        <v-tooltip left :disabled="tooltips[1]" v-model="tooltips[1]">
            <v-btn
            slot="activator"
            fab
            dark
            small
            color="blue-grey darken-3"
            @click="showTicketForm"
            >
            <v-icon>mdi-form-select</v-icon>
            </v-btn>
            <span>CONSIGUE TU ENTRADA</span>
        </v-tooltip>
        
        <v-tooltip left :disabled="tooltips[2]" v-model="tooltips[2]">
            <v-btn
            slot="activator"
            fab
            dark
            small
            color="blue-grey darken-3"
            @click="showTimeline"
            >
            <v-icon>mdi-calendar</v-icon>
            </v-btn>
            <span>INFORMACIÓN Y HORARIOS DE EVENTOS</span>
        </v-tooltip>
        <v-tooltip left :disabled="tooltips[3]" v-model="tooltips[3]">
            <v-btn
            slot="activator"
            fab
            dark
            small
            color="blue-grey darken-3"
            @click="showQRForm"
            >
            <v-icon>mdi-qrcode-scan</v-icon>
            </v-btn>
            <span>SCAN QR</span>
        </v-tooltip>
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
            transition:"fade-transition", //if we want to use slide-y-reverse-transition, we need to add a watcher and use timeouts, because tooltip wont align properly
            tooltips: [
                true,true,true,true
            ]
        }
    },
    methods:    {
        showTicketForm()    {
            this.$nuxt.$emit("toggleTicketForm")
        },
        showTimeline()    {
            this.$nuxt.$emit("toggleTimeline")
        },
        showLoginForm()     {
            this.$nuxt.$emit("toggleLoginForm")
        },
        showQRForm()     {
            this.$nuxt.$emit("toggleQRReader")
        }
    }
}
</script>

