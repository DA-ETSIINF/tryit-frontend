/**
 * The status of the API is represented by the following diagram
 *
 *
 * 		State 1   -------→   State 2   -------→   State 3
 * 							    ↓	 				↑
 * 							 State 4   ←------→   State 5
 *
 * State 1 | "not-initialized": The page just started and the default values in the store
 * are set
 * State 2 | "loading": The app made the request to the server
 * State 3 | "ok": The server has responded with a OK status
 * State 4 | "error": The server has responded with an error or there was a connection error.
 * An option to the user is given to try the request again after a countdown.
 * State 5 | "retrying": The app makes the request to the server again
 *
 * State 2 and 5 represent the state when the app is waiting the response from the
 * server. After getting the response, the state will be 3 or 4.
 */

export interface ApiStatusSuper {
	readonly page: "schedule"
}

export interface ApiStatusNotInitialized extends ApiStatusSuper {
	state: "not-initialized"
}

export interface ApiStatusLoading extends ApiStatusSuper {
	state: "loading"
	timeRequired: number
}

export interface ApiStatusOk extends ApiStatusSuper {
	state: "ok"
}

export interface ApiStatusError extends ApiStatusSuper {
	state: "error"
	error: any
	countdown: number
	retry: Function
}

export interface ApiStatusRetrying extends ApiStatusSuper {
	state: "retrying"
	timeRequired: number
}

export type ApiStatusStates = "not-initialized" | "loading" | "ok" | "error" | "retrying"
export type ApiStatus =
	| ApiStatusNotInitialized
	| ApiStatusLoading
	| ApiStatusOk
	| ApiStatusError
	| ApiStatusRetrying
