import { Requirement } from "./requirements"
import { Indexes } from "./indexes"
import { StatusOnInput } from "./inputStatus"

export interface dayPeriodType {
	period: string
	checked: boolean
	htmlId: number
}

export interface TimePeriodsType {
	ms: number
	dayWeek: string
	dayMonth: string
	dayPeriods: dayPeriodType[]
}

export type PeriodsAvailable = "morning" | "afternoon"

export interface AvailabilityInputType {
	timePeriods: TimePeriodsType[]
	periodsAvailable: PeriodsAvailable[]
	status?: StatusOnInput
}

export interface FS_Availability {
	tag: "availability-input"
	properties: AvailabilityInputType
	id: string
	value: string
	requirements: Requirement[]
	indexes?: Indexes
}
