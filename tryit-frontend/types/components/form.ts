/**
 * TODO
 */

import { FS_TextInput } from "./textInput"
import { FS_TextAreaInput } from "./textArea"
import { FS_Student } from "./studentInput"
import { FS_Select } from "./selectInput"
import { FS_Labels } from "./labelsInput"
import { FS_CheckboxDetail } from "./checkboxDetailInput"
import { FS_Availability } from "./availabilityInput"

export type DynamicFormModule = "ticket" | "volunteer"
export type InputType =
	| FS_TextInput
	| FS_Student
	| FS_Select
	| FS_Labels
	| FS_CheckboxDetail
	| FS_Availability
	| FS_TextAreaInput
export interface FormSectionType {
	title?: string
	description?: string
	oneColumnSection?: boolean
	inputs: InputType[]
}

export interface StatusForm {
	everythingOk: boolean
}

export interface FormType {
	title?: string
	description?: string
	sections: FormSectionType[]
	formModule: DynamicFormModule
	status: StatusForm
}
