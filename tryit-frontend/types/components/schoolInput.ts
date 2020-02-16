/**
 * TODO
 */
import { OptionSelected } from "./optionSelected"

export interface SchoolInput {
	open: boolean
	schoolsOptions: OptionSelected[][]
	schoolSelected: OptionSelected
	oldSchoolSelected: OptionSelected
}
