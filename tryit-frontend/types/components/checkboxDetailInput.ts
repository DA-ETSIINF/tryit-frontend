export interface CheckboxDetailInputType {
	text: string
	details?: string[]
	checked: boolean
	id: string
}

export interface FS_CheckboxDetail {
	tag: "checkbox-detail"
	properties: CheckboxDetailInputType
}
