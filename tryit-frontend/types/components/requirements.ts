export type Requirements = OnlyLetters

export interface OnlyLetters {
	type: "only-letters"
	validate?(id: string)
}
