import { TextInputIdType } from "./textInput"
import { TextAreaIdType } from "./textArea"
import { StudentInputIdType } from "./studentInput"
import { AvailabilityInputType } from "./availabilityInput"
import { CheckboxDetailInputIdType } from "./checkboxDetailInput"
import { SelectInputIdType } from "./selectInput"
import { LabelInputIdType } from "./labelsInput"

export type InputIdType =
	| TextInputIdType
	| StudentInputIdType
	| TextAreaIdType
	| AvailabilityInputType
	| CheckboxDetailInputIdType
	| SelectInputIdType
	| LabelInputIdType
