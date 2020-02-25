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

export function emitAreInputOk(
	formModule: DynamicFormModule,
	content: {
		value: boolean
	}
) {
	switch (formModule) {
		case "ticket":
			TicketModule.updateAreInputsOk(content)
			break
		case "volunteer":
			VolunteerModule.updateAreInputsOk(content)
			break
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
	switch (formModule) {
		case "ticket":
			TicketModule.updateInput(content)
			break
		case "volunteer":
			VolunteerModule.updateInput(content)
			break
	}
}

export function emitProperty(
	formModule: DynamicFormModule,
	content: {
		key: string
		value: InputValueType
		indexes: Indexes
	}
) {
	switch (formModule) {
		case "ticket":
			TicketModule.updateProperty(content)
			break
		case "volunteer":
			VolunteerModule.updateProperty(content)
			break
	}
}

export function emitStatusOnInput(
	formModule: DynamicFormModule,
	content: { indexes: Indexes; status: StatusOnInput }
) {
	switch (formModule) {
		case "ticket":
			TicketModule.updateStatusOnInput(content)
			break
		case "volunteer":
			VolunteerModule.updateStatusOnInput(content)
			break
	}
}
