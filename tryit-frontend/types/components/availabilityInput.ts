import { Requirement } from "./requirements"
import { Indexes } from "./indexes"
import { StatusOnInput } from "./inputStatus"
import { Requires } from "./requires"

export type AvailabilityInputValueType = string[]
export interface DayPeriodType {
	period: string
	checked: boolean
	htmlId: number
}

export interface TimePeriodsType {
	ms: number
	dayWeek: string
	dayMonth: string
	dayPeriods: DayPeriodType[]
}

export type PeriodsAvailable = "morning" | "afternoon"

export interface AvailabilityInputType {
	timePeriods: TimePeriodsType[]
	periodsAvailable: PeriodsAvailable[]
	status: StatusOnInput
}

export interface FS_Availability {
	tag: "availability-input"
	properties: AvailabilityInputType
	id: string
	value: AvailabilityInputValueType
	requirements: Requirement[]
	indexes?: Indexes
	requires?: Requires[]
	show?: boolean
}
