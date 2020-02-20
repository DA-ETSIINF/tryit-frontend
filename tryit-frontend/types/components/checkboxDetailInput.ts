import { Requirement } from "./requirements"
import { Indexes } from "./indexes"
import { StatusOnInput } from "./inputStatus"
export interface CheckboxDetailInputType {
	text: string
	details?: string[]
	checked: boolean
	htmlId: string
	status?: InputStatus
}

export interface FS_CheckboxDetail {
	tag: "checkbox-detail"
	properties: CheckboxDetailInputType
	id: string
	value: string
	requirements: Requirement[]
	indexes?: Indexes
}
