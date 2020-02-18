/**
 * TODO
 */

import { Requirements } from "./requirements"
import { OptionSelected } from "./options"

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
	requirements: Requirements[]
}
