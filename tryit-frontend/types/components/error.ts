/**
 * TODO
 */
export interface ErrorDetailOnInput {
	message: string
	abbreviation: string
}
export interface ErrorOnInput {
	error: boolean
	errorDetail: ErrorDetailOnInput
}
