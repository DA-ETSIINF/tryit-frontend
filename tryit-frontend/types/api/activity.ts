import { BreakResource, WorkshopResource, TalkResource, Event } from "./"
export interface ActivityResource {
	activity: ActivitySelect
	type: "workshop" | "talk"
	date: number
}
export type ActivitySelect = BreakResource | WorkshopResource | TalkResource | Event
