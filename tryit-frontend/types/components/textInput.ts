/**
 * TODO
 */
import { InputStatus } from "./inputState"
import { Requirement } from "./requirements"
import { Indexes } from "./indexes"

export interface TextInputType {
	helperText?: string
	placeholder?: string
	isDisabled?: boolean
	hideText?: boolean
	status?: InputStatus
	noBorder?: boolean
	noShadows?: boolean
	leaveSpaceRight?: boolean
}

export interface FS_TextInput {
	tag: "text-input"
	question?: string
	properties: TextInputType
	value: string
	id: string
	requirements: Requirement[]
	indexes?: Indexes
}
