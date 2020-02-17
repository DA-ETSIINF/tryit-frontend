import { MutationTree, ActionTree, ActionContext, GetterTree, StoreOptions } from "vuex"
import { Context as AppContext } from "@nuxt/types"
import { RootState, MenuResource } from "~/types"
import {ticket} from './modules/ticket/index'
import {organizer} from './modules/organizer/index'
import {sponsors} from './modules/sponsors/index'
import {streaming} from './modules/streaming/index'
import {ects} from './modules/ECTS/index'
import {contact} from './modules/contact/index'
import {activities} from './modules/activities/index'



export const store: StoreOptions<RootState> = {
    modules: {
		ticket,
		organizer,
		sponsors,
		streaming,
		ects,
		contact,
		activities
    }
};

export const MenuState:MenuResource={
	primary:undefined,
	secundary:undefined,
	error:false

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

