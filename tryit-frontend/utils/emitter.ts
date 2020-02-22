import { Indexes, DynamicFormModule, InputValueType, StatusOnInput } from "~/types/components"
import { TicketModule } from "../store/ticket"
import { VolunteerModule } from "../store/volunteer"

export function getModuleByType(formModule: DynamicFormModule) {
	switch (formModule) {
		case "ticket":
			return TicketModule
		case "volunteer":
			return VolunteerModule
	}
}
export function emitInput(
	formModule: DynamicFormModule,
	content: {
		key: string
		value: InputValueType
		indexes: Indexes
	}
) {
	getModuleByType(formModule).updateInput(content)
}

export function emitProperty(
	formModule: DynamicFormModule,
	content: {
		key: string
		value: InputValueType
		indexes: Indexes
	}
) {
	getModuleByType(formModule).updateProperty(content)
}

export function emitErrorOnInput(
	formModule: DynamicFormModule,
	content: { indexes: Indexes; status: StatusOnInput }
) {
	getModuleByType(formModule).updateErrorOnInput(content)
}
