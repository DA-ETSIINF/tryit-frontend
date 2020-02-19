/**
 * TODO
 */
export interface ErrorDetailOnInput {
	message: string
	abbreviation: string
}
export interface NoErrorOnInput {
	error: false
}

export interface _ErrorOnInput {
	error: true
	errorDetail: ErrorDetailOnInput
}

export type ErrorOnInput = NoErrorOnInput | _ErrorOnInput
