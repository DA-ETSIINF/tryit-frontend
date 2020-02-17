export interface StudentType {
	isStudent: boolean
	isUpmStudent: boolean
}

export interface FS_Student {
	tag: "student-input"
	question?: string
	properties: StudentType
}
