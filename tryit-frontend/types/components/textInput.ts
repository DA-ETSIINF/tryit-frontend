/**
 * TODO
 */
import { InputStatus } from "./inputState"

export interface TextInputType {
	helperText?: string
	placeholder?: string
	value?: string
	isDisabled?: boolean
	hideText?: boolean
	status?: InputStatus
	noBorder?: boolean
	noShadows?: boolean
	leaveSpaceRight?: boolean
}

export interface FormTextInputType {
	tag: "text-input"
	question?: string
	properties: TextInputType
}
