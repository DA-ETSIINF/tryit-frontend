/**
 * TODO
 */

import { Requirement } from "./requirements"
import { OptionSelected } from "./options"
import { Indexes } from "./indexes"

export interface SelectInputType {
	open: boolean
	options: OptionSelected[][]
	selected: OptionSelected
	oldSelected: OptionSelected
}

export interface FS_Select {
	tag: "select-input"
	question?: string
	properties: SelectInputType
	id: string
	value: string
	requirements: Requirement[]
	indexes?: Indexes
}
