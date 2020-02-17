/**
 * TODO
 */

export interface SelectInput {
	tag: "select-input"
	question?: string
	properties: SelectBoxInput
}

export interface OptionSelected {
	title: string
	id: number
}

export interface SelectBoxInput {
	open: boolean
	options: OptionSelected[][]
	selected: OptionSelected
	oldSelected: OptionSelected
}
