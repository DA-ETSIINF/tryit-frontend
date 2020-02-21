/**
 * TODO
 */

import { Requirement } from "./requirements"
import { OptionSelected } from "./options"
import { Indexes } from "./indexes"
import { StatusOnInput } from "./inputStatus"
import { Requires } from "./requires"

export type SelectInputValueType = string
export type SelectInputIdType = SelectInputValueType
export interface SelectInputType {
	open: boolean
	options: OptionSelected[][]
	selected: OptionSelected
	oldSelected: OptionSelected
	status?: StatusOnInput
}

export interface FS_Select {
	tag: "select-input"
	question?: string
	properties: SelectInputType
	id: SelectInputIdType
	value: SelectInputValueType
	requirements: Requirement[]
	indexes?: Indexes
	requires?: Requires[]
	show?: boolean
}
