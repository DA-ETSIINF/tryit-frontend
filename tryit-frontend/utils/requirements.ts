import { DynamicFormModule, InputType, FormType } from "~/types/components"
import { emitAreInputOk } from "./"
import { getFormName, getFormByName } from "./index"

export function checkForRequirements(formModule: DynamicFormModule) {
	let formName = getFormName(formModule)
	if (!formName) {
		return
	}
	let form: FormType = getFormByName(formName)
	console.log("Requirements: ", form)
	let canShowButton =
		form.sections
			.map(s => s.inputs)
			.flat()
			.filter((i: InputType) => i.properties.status?.status !== "ok" && i.show).length === 0
	emitAreInputOk(formModule, { value: canShowButton })
}
