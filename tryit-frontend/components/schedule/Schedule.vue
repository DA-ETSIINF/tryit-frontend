<template>
	<h1>Schedule Component</h1>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import { ActivityResource } from "../../types/api"

@Component({})
export default class Schedule extends Vue {
	card: ActivityResource = {
		activity: {
			title: "Charla 1",
			startDate: 12312312312,
			endDate: 12312318312,
			name: ""
		},
		type: "talk",
		date: 12312312312
	}
}
</script>

<style scoped></style>
