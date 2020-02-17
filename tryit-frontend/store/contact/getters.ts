import { GetterTree } from "vuex"
import { ContactState } from "./index"
import { ContactResource } from "~/types"
import { RootState } from "~/types"

export const getters: GetterTree<ContactState, RootState> = {
	getContactInfo: ({ contactInfo }): ContactResource => {
		if (!contactInfo) {
			return {
				description: "",
				email: "",
				title: ""
			}
		} else {
			return {
				description: contactInfo.description || "",
				email: contactInfo.email || "",
				title: contactInfo.title || ""
			}
		}
	}
}

export default getters
