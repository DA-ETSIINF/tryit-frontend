import { Requirements } from "./requirements"
import { InputStatus } from "./inputState"
import { OptionSelected } from "./options"

export interface LabelInputType {
	options: OptionSelected[]
	selected: number
	status?: InputStatus
	errorMsg?: string
}

export interface FS_Labels {
	tag: "labels-input"
	question: string
	properties: LabelInputType
	id: string
	value: string
	requirements: Requirements[]
}
