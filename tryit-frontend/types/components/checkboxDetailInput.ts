import { Requirement } from "./requirements"
import { Indexes } from "./indexes"
import { StatusOnInput } from "./inputStatus"
import { Requires } from "./requires"

export type CheckboxDetailInputValueType = boolean
export type CheckboxDetailInputIdType = string
export interface CheckboxDetailInputType {
	text: string
	details?: string[]
	checked: boolean
	htmlId: string
	status: StatusOnInput
}

export interface FS_CheckboxDetail {
	tag: "checkbox-detail"
	properties: CheckboxDetailInputType
	id: CheckboxDetailInputIdType
	value: CheckboxDetailInputValueType
	requirements: Requirement[]
	indexes?: Indexes
	requires?: Requires[]
	show?: boolean
}
