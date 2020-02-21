import { TextInputValueType } from "./textInput"
import { TextAreaValueType } from "./textArea"
import { StudentInputValueType } from "./studentInput"
import { AvailabilityInputType } from "./availabilityInput"
import { CheckboxDetailInputValueType } from "./checkboxDetailInput"
import { SelectInputValueType } from "./selectInput"
import { LabelInputValueType } from "./labelsInput"

export type InputValueType =
	| TextInputValueType
	| StudentInputValueType
	| TextAreaValueType
	| AvailabilityInputType
	| CheckboxDetailInputValueType
	| SelectInputValueType
	| LabelInputValueType
