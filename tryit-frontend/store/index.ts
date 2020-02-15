import { MutationTree, ActionTree, ActionContext, GetterTree, StoreOptions } from "vuex"
import { Context as AppContext } from "@nuxt/types"
import { RootState, MenuResource } from "~/types"
import {ticket} from '~/store/modules/ticket/index'
import { checkDniResponse } from "~/types/checkDniResponse";

export const store: StoreOptions<RootState> = {
    modules: {
        ticket
    }
};

export const MenuState:MenuResource={
	primary:undefined,
	secundary:undefined,
	error:false

}

export const mutations: MutationTree<RootState> = {}

interface Actions<S, R> extends ActionTree<S, R> {
	nuxtServerInit(actionContext: ActionContext<S, R>, appContext: AppContext): void
}

export const actions: Actions<RootState, RootState> = {
	async nuxtServerInit({ commit }, context) {}
}
export const getter: GetterTree<RootState, RootState>={
	valid_id(value): checkDniResponse{
			if( value === undefined) {
				// return "El DNI/NIE es obligatorio"
				const response : checkDniResponse ={
					message : "El DNI/NIE es obligatorio",
					message_abbr : "DNI is missing",
					cod:1
				}
				return response
			}
			const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET'
			const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i
			const nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i
			const str = value.toString().toUpperCase()
		
			if (!nifRexp.test(str) && !nieRexp.test(str)){
				const response : checkDniResponse ={
					message : "Comprueba el DNI/NIE. Debe tener letra.",
					message_abbr : "Letter is missing",
					cod:2
				}
				return response
			}
		
			const nie = str
				.replace(/^[X]/, '0')
				.replace(/^[Y]/, '1')
				.replace(/^[Z]/, '2')
		
			const letter = str.substr(-1)
			const charIndex = parseInt(nie.substr(0, 8)) % 23
		
			if (validChars.charAt(charIndex) === letter) {
				const response : checkDniResponse ={
					message : "El DNI es válido",
					message_abbr : "OK",
					cod:200
				}
				return response
			}else{}
				const response : checkDniResponse ={
					message : "Comprueba el DNI/NIE. Es inválido.",
					message_abbr : "Invalid DNI",
					cod:3
				}
				return response
		}
	}

