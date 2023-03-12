/**
 * TODO
 */
import { StatusOnInput } from "./inputStatus"
import { Requirement } from "./requirements"
import { Indexes } from "./indexes"
import { Requires } from "./requires"

export type TextInputValueType = string
export type TextInputIdType = string
export interface TextInputType {
	helperText?: string
	placeholder?: string
	isDisabled?: boolean
	hideText?: boolean
	status: StatusOnInput
	noBorder?: boolean
	noShadows?: boolean
	leaveSpaceRight?: boolean
}

export interface FS_TextInput {
	tag: "text-input"
	question?: string
	properties: TextInputType
	value: TextInputValueType
	id: TextInputIdType
	requirements: Requirement[]
	indexes?: Indexes
	requires?: Requires[]
	show?: boolean
}
