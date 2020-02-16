/**
 * TODO
 */

import { FormTextInputType } from "./textInput"
import { SelectInput } from "./selectInput"
import { IsStudentInput } from "./studentInput"
import { LabelsType } from "./labelsInput"
import { CheckboxDetailType } from "./checkboxDetailInput"

export interface FormSectionType {
	title?: string
	description?: string
	inputs: (FormTextInputType | IsStudentInput | SelectInput | LabelsType | CheckboxDetailType)[]
}

export interface FormType {
	title?: string
	description?: string
	sections: FormSectionType[]
}
