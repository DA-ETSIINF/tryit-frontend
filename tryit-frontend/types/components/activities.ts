import { TalkResource, WorkshopResource } from "../api"

export interface ActivitiesByDay {
	day: string
	activities: (TalkResource | WorkshopResource)[]
}
