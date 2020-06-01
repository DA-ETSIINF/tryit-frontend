import { ActivitiesByDay } from "~/types/components"
import { TalkResource, WorkshopResource, SponsorCategory } from "~/types/api"

import { Section, SectionName, ScheduleRequest } from "~/types/store/schedule"

import { App } from "../"
import { getHTTP } from "./api"

/**
 * @description It will sort and group the activities by week day
 * @author Max
 * @version 1
 * @since 04/March/2020
 * @example
 * groupByDays([{name: "A1", startDate: 1582621200000},
 * 				{name: "A2", startDate: 1582729200000}
 * 				{name: "A3", startDate: 1582876800000},
 * 				{name: "A4", startDate: 1582722000000}])
 *
 * It will return activitiesByDay which contains:
 * 			[{
 * 				day: "tuesday, February 25",
 * 				activities: [{name: "A1", date: 1582621200000}]
 * 			},
 * 			{
 * 				day: "wednesday, February 26",
 * 				activities: [
 *              {name: "A4", date: 1582722000000},
 * 							{name: "A2", date: 1582729200000}
 *              ]
 * 			},
 * 			{
 * 				day: "friday, February 28",
 * 				activities: [{name: "A3", date: 1582876800000}]
 * 			}]
 *
 * NOTE: Some keys of the object in the arguments and return variables have been omitted
 */
export function groupByDays(
	activities: (TalkResource | WorkshopResource)[],
	locale: string = App.navigatorLanguage
): ActivitiesByDay[] {
	let indexNEEDSTOBEREMOVED = 0
	const activitiesByDay: ActivitiesByDay[] = []
	activities
		.sort((a1, a2) => a1.start_date - a2.start_date)
		.map((activity) => {
			const date = new Date(activity.start_date)
			const day = date.toLocaleDateString(locale, {
				weekday: "long",
				month: "long",
				day: "numeric",
			})

			/**This lines should be removed when the API returns the correct format for the companies in the speakers array */
			// https://github.com/DA-ETSIINF/TryIT/issues/194
			activity.speakers?.forEach((s, i) => {
				if (activity.speakers !== undefined) {
					const posibilities: (SponsorCategory | undefined)[] = [
						undefined,
						"platinum",
						"gold",
						"silver",
						"bronze",
					]
					activity.speakers[i].company = {
						name: (s as any).company,
						sponsor_type: posibilities[Math.floor(Math.random() * posibilities.length)],
					}
					activity.speakers[i].email = "test@test.com "

					// Parser of the social media
					activity.speakers[i].social_media = {
						facebook: activity.speakers[i]["facebook_profile"],
						github: activity.speakers[i]["github_profile"],
						gitlab: activity.speakers[i]["gitlab_profile"],
						linkedin: activity.speakers[i]["linkedin_profile"],
						twitter: "twitter.com/iam_mad_max",
					}
					activity.speakers[i].image = activity.speakers[i]["picture"]
				}
			})
			activity.id = indexNEEDSTOBEREMOVED++
			activity.location = (activity as any).rooms

			// Remove until here

			const found: number | undefined = activitiesByDay.findIndex((a) => a.day === day)
			if (found === -1) {
				activitiesByDay.push({
					day,
					activities: [activity],
				})
			} else {
				activitiesByDay[found].activities.push(activity)
			}
		})
	console.log(activitiesByDay)
	return activitiesByDay
}

export function getDataSection(uri: string, id: SectionName, type): Promise<Section> {
	return new Promise((resolve, reject) => {
		getHTTP(uri)
			.then((data) => {
				const sessions = data.data.map((session) => ({ type, ...session }))
				resolve({
					data: sessions,
					id,
				})
			})
			.catch((err) => {
				reject({
					err,
					id,
				})
			})
	})
}

export function getPromises(): Promise<Section>[] {
	console.log(App.uris)
	const requests: ScheduleRequest[] = [
		{
			promise: null,
			uri: App.uris.talks,
			sectionName: "talks",
			generates: "talk",
		},
		{
			promise: null,
			uri: App.uris.workshops,
			sectionName: "workshops",
			generates: "workshop",
		},
	]
	const promises = requests.map((req) => getDataSection(req.uri, req.sectionName, req.generates))
	return promises
}

export const countdown = 5
