import { Requirement } from "./requirements"
import { Indexes } from "./indexes"
import { StatusOnInput } from "./inputStatus"

export interface StudentType {
	isStudent: boolean
	isUpmStudent: boolean
	status?: StatusOnInput
}

export interface FS_Student {
	tag: "student-input"
	question?: string
	properties: StudentType
	id: string
	value: string
	requirements: Requirement[]
	indexes?: Indexes
}
