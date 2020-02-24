import { Requirement } from "./requirements"
import { Indexes } from "./indexes"
import { StatusOnInput } from "./inputStatus"
import { Requires } from "./requires"

export type StudentInputIdType = string
export interface StudentInputValueType {
	isStudent: boolean
	isUpmStudent: boolean
}
export interface StudentType {
	status: StatusOnInput
}

export interface FS_Student {
	tag: "student-input"
	question?: string
	properties: StudentType
	id: StudentInputIdType
	value: StudentInputValueType
	requirements: Requirement[]
	indexes?: Indexes
	requires?: Requires[]
	show?: boolean
}
