import { Requirement } from "./requirements"
import { StatusOnInput } from "./inputStatus"
import { OptionSelected } from "./options"
import { Indexes } from "./indexes"
import { Requires } from "./requires"

export type LabelInputValueType = string
export type LabelInputIdType = string
export interface LabelInputType {
	options: OptionSelected[]
	selected: number
	errorMsg?: string
	status?: StatusOnInput
}

export interface FS_Labels {
	tag: "labels-input"
	question: string
	properties: LabelInputType
	id: LabelInputIdType
	value: LabelInputValueType
	requirements: Requirement[]
	indexes?: Indexes
	requires?: Requires[]
	show?: boolean
}
