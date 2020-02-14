import { MutationTree, ActionTree, ActionContext, GetterTree, StoreOptions } from "vuex"
import { Context as AppContext } from "@nuxt/types"
import { RootState } from "~/types"
import {ticket} from '~/store/modules/ticket/index'

export const store: StoreOptions<RootState> = {
    modules: {
        ticket
    }
};

export const mutations: MutationTree<RootState> = {}

interface Actions<S, R> extends ActionTree<S, R> {
	nuxtServerInit(actionContext: ActionContext<S, R>, appContext: AppContext): void
}

export const actions: Actions<RootState, RootState> = {
	async nuxtServerInit({ commit }, context) {}
}
export const getter: GetterTree<RootState, RootState>={
	valid_id(value): boolean{
			if( value === undefined) {
				// return "El DNI/NIE es obligatorio"
				return false
			}
			const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET'
			const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i
			const nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i
			const str = value.toString().toUpperCase()
		
			if (!nifRexp.test(str) && !nieRexp.test(str))
				return false
				// return "Comprueba el DNI/NIE. Debe tener letra."
		
			const nie = str
				.replace(/^[X]/, '0')
				.replace(/^[Y]/, '1')
				.replace(/^[Z]/, '2')
		
			const letter = str.substr(-1)
			const charIndex = parseInt(nie.substr(0, 8)) % 23
		
			if (validChars.charAt(charIndex) === letter) {
				return true
			}else
				return false
		}
	}
}
