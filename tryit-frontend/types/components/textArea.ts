/**
 * TODO
 */
import { Requirement } from "./requirements"
import { StatusOnInput } from "./inputStatus"
import { Indexes } from "./indexes"
import { Requires } from "./requires"
export type TextAreaValueType = string
export type TextAreaIdType = string
export interface TextAreaType {
	helperText?: string
	placeholder?: string
	isDisabled?: boolean
	hideText?: boolean
	status: StatusOnInput
	noBorder?: boolean
	noShadows?: boolean
	leaveSpaceRight?: boolean
}

export interface FS_TextAreaInput {
	tag: "text-area"
	question?: string
	properties: TextAreaType
	id: TextAreaIdType
	value: TextAreaValueType
	requirements: Requirement[]
	indexes?: Indexes
	requires?: Requires[]
	show?: boolean
}
