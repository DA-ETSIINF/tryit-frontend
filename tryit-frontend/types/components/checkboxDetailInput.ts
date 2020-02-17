export interface CheckboxDetailInput {
	text: string
	details?: string[]
	checked: boolean
	id: string
}

export interface CheckboxDetailType {
	tag: "checkbox-detail"
	properties: CheckboxDetailInput
}
