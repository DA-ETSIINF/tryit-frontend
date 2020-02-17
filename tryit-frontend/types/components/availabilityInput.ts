export interface dayPeriodType {
	period: string
	checked: boolean
	id: number
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
}

export interface FS_Availability {
	tag: "availability-input"
	properties: AvailabilityInputType
}
