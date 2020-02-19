import { Requirement } from "./requirements"
import { Indexes } from "./indexes"

export interface StudentType {
	isStudent: boolean
	isUpmStudent: boolean
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
