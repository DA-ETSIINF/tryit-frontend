import { InputStatus } from "./inputState"
import { OptionSelected } from "./selectInput"

export interface LabelInput {
	options: OptionSelected[]
	selected: number
	status?: InputStatus
	errorMsg?: string
}
export interface LabelsType {
	tag: "labels-input"
	question: string
	properties: LabelInput
}
