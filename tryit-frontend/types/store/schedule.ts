import { TalkResource, WorkshopResource } from "~/types/api"

interface TalksSection {
	id: "talks"
	data: TalkResource[]
}
interface WorkshopsSection {
	id: "workshops"
	data: WorkshopResource[]
}
export type SectionName = "talks" | "workshops"
export type Section = TalksSection | WorkshopsSection

export interface ScheduleRequest {
	promise: Promise<Section> | null
	uri: string
	sectionName: SectionName
	generates: "talk" | "workshop"
}
