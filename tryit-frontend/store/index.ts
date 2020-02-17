import { MutationTree, StoreOptions } from "vuex"
import { RootState, MenuResource } from "~/types"
import { ticket } from "./ticket"
import { organizer } from "./organizer"
import { ects } from "./ECTS"
import { contact } from "./contact"
import { activities } from "./activities"

export const store = (): StoreOptions<RootState> => ({})

export const MenuState: MenuResource = {
	primary: undefined,
	secondary: undefined,
	error: false
}

export const mutations: MutationTree<RootState> = {}

// interface Actions<S, R> extends ActionTree<S, R> {
// 	nuxtServerInit(actionContext: ActionContext<S, R>, appContext: AppContext): void
// }

// export const actions: Actions<RootState, RootState> = {
// 	async nuxtServerInit({ commit }, context) {}
// }
// export const getter: GetterTree<RootState, RootState>={

// }
