<template>
	<div class="ticket-container">
		<select-input
			:title="'¿En qué Escuela estudias?'"
			:options="schoolInput.schoolsOptions"
			:optionSelected="schoolInput.schoolSelected"
			:open="schoolInput.open"
			v-on:change="schoolChanged(...arguments)"
			v-on:toogleOpen="toogleOpen(...arguments)"
		></select-input>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { TextInput, CheckboxInput, CheckboxDetail, StudentInput, SelectInput } from "../components"
import { OptionSelected, SchoolInput } from "../types/components"

Vue.component("CheckboxInput", CheckboxInput)
Vue.component("TextInput", TextInput)

@Component({
	name: "ticket",
	components: { CheckboxDetail, StudentInput, SelectInput }
})
export default class Ticket extends Vue {
	schoolInput: SchoolInput = {
		schoolsOptions: [
			[
				{
					title: "Escuela Superior de Ingenieros Informáticos",
					id: 1
				}
			],
			[
				{
					title: "Escuela Superior de Arquitectos",
					id: 2
				},
				{
					title: "Escuela Superior de Moda",
					id: 3
				},
				{
					title: "Escuela Superior de Moda",
					id: 4
				},
				{
					title: "Escuela Superior de Moda",
					id: 5
				},
				{
					title: "Escuela Superior de Moda",
					id: 6
				},
				{
					title: "Escuela Superior de Moda",
					id: 7
				},
				{
					title: "Escuela Superior de Moda",
					id: 8
				}
			]
		],
		schoolSelected: {
			title: "Escuela Superior de Ingenieros Informáticos",
			id: 1
		},
		oldSchoolSelected: {
			title: "Escuela Superior de Ingenieros Informáticos",
			id: 1
		},
		open: false
	}

	schoolChanged(newSchool: OptionSelected, shouldClose: boolean = true) {
		this.schoolInput.schoolSelected = newSchool
		if (shouldClose) {
			this.schoolInput.open = false
		}
	}
	toogleOpen(v: boolean, shouldClear: boolean = false) {
		if (!v) {
			this.schoolInput.schoolSelected = this.schoolInput.oldSchoolSelected
		}
		this.schoolInput.open = v
		if (shouldClear) {
			this.schoolInput.oldSchoolSelected = this.schoolInput.schoolSelected
			this.schoolInput.schoolSelected = {
				...this.schoolInput.schoolSelected,
				title: ""
			}
		}
	}
}
</script>

<style scoped>
.ticket-container {
	padding-top: 52px;
}
</style>
