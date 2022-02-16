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
            mdi-account-circle
            </v-icon>
        </v-btn>
        </template>
        <v-btn
        fab
        dark
        small
        color="green"
        @click="hideDialog"
        >
        <v-icon>mdi-form-select</v-icon>
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
        hideDialog()    {
            this.$nuxt.$emit("toggleTicketForm")
        }
    }
}
</script>

