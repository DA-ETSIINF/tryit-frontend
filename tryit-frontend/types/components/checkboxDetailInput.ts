import { Requirements } from "./requirements"
export interface CheckboxDetailInputType {
	text: string
	details?: string[]
	checked: boolean
	htmlId: string
}

export interface FS_CheckboxDetail {
	tag: "checkbox-detail"
	properties: CheckboxDetailInputType
	id: string
	value: string
	requirements: Requirements[]
}
