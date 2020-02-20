import { Requirement } from "./requirements"
import { InputStatus, StatusOnInput } from "./inputStatus"
import { OptionSelected } from "./options"
import { Indexes } from "./indexes"

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
	id: string
	value: string
	requirements: Requirement[]
	indexes?: Indexes
}
