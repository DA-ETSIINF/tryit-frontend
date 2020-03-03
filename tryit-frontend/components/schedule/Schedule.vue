<template>
	<div>
		<talk v-for="activity in activities" :key="activity.title" :activity="activity"></talk>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator"
import { ActivityResource, TalkResource } from "../../types/api"

@Component({})
export default class Schedule extends Vue {
	activitiesByDay!: {
		id: number
		activities: TalkResource[]
	}[]
	activities: TalkResource[] = [
		{
			title:
				"¿Sueñan los androides con ovejas eléctricas? Cómo puedo crear mis propias inteligencias artificiales",
			description:
				"Pequeña descrición de lo que hace y de lo que no hace. Si es muy larga ponemos, labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.",
			speakers: [
				{
					name: "Arturo Vidal",
					bio: "Biografia",
					image:
						"https://image.shutterstock.com/image-photo/portrait-smiling-red-haired-millennial-260nw-1194497251.jpg",
					company: {
						name: "Google",
						sponsorType: "platinum",
						logo:
							"https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
						url: "https://google.com"
					},
					web: "https://google.com",
					socialMedia: {
						twitter: "https://twitter.com/google"
					}
				},
				{
					name: "Alvaro ",
					bio: "Biografia",
					image:
						"https://image.shutterstock.com/image-photo/portrait-smiling-red-haired-millennial-260nw-1194497251.jpg",
					company: {
						name: "Google",
						sponsorType: "platinum",
						logo:
							"https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
						url: "https://google.com"
					},
					web: "https://google.com",
					socialMedia: {
						twitter: "https://twitter.com/google"
					}
				}
			],
			startDate: 123134131,
			endDate: 123138131,
			url: "https://twitter.com/google",
			room: "Sala principal"
		},
		{
			title: "Charla interesante",
			description:
				"Pequeña descrición de lo que hace y de lo que no hace. Si es muy larga ponemos, labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.",
			speakers: [
				{
					name: "Arturo Vidal",
					bio: "Biografia",
					image:
						"https://image.shutterstock.com/image-photo/portrait-smiling-red-haired-millennial-260nw-1194497251.jpg",
					company: {
						name: "Google",
						sponsorType: "platinum",
						logo:
							"https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
						url: "https://google.com"
					},
					web: "https://google.com",
					socialMedia: {
						twitter: "https://twitter.com/google"
					}
				},
				{
					name: "Alvaro ",
					bio: "Biografia",
					image:
						"https://image.shutterstock.com/image-photo/portrait-smiling-red-haired-millennial-260nw-1194497251.jpg",
					company: {
						name: "Google",
						sponsorType: "platinum",
						logo:
							"https://storage.googleapis.com/gd-wagtail-prod-assets/images/evolving_google_identity_2x.max-4000x2000.jpegquality-90.jpg",
						url: "https://google.com"
					},
					web: "https://google.com",
					socialMedia: {
						twitter: "https://twitter.com/google"
					}
				}
			],
			startDate: 123134131,
			endDate: 123138131,
			url: "https://twitter.com/google",
			room: "Sala principal"
		}
	]

	mounted() {
		console.log("adfdsf")
		this.activities.forEach(activity => {
			const day = new Date(activity.startDate).getDate()
			let i = 0
			const needsToCreate =
				this.activitiesByDay.filter((a, index) => {
					if (a.id === day) {
						i = index
						return true
					} else {
						return false
					}
				}).length === 0
			if (needsToCreate) {
				this.activitiesByDay.push({
					id: day,
					activities: [activity]
				})
			} else {
				this.activitiesByDay[i].activities.push(activity)
			}
		})
	}
}
</script>

<style scoped></style>
