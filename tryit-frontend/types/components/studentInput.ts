export interface IsStudentType {
	isStudent: boolean
	isUpmStudent: boolean
}

export interface IsStudentInput {
	tag: "student-input"
	question?: string
	properties: IsStudentType
}
