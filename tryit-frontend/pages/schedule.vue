<template>
	<div>
		<h1>Programa</h1>
		<schedule-component></schedule-component>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { Schedule as ScheduleComponent, Talk, Badge } from "../components"

Vue.component("ScheduleComponent", ScheduleComponent)
Vue.component("Talk", Talk)
Vue.component("Badge", Badge)

@Component({})
export default class Schedule extends Vue {}
</script>

<style scoped></style>
