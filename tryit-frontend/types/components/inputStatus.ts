/**
 * TODO
 */

export type InputStatus = "" | "ok" | "error" | "info"
export interface StatusDetailOnInput {
	message: string
	abbreviation: string
}

export interface StatusOnInput {
	status: InputStatus
	statusDetail: StatusDetailOnInput
}
