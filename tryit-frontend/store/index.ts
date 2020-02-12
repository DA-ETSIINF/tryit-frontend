import { MutationTree, ActionTree, ActionContext } from "vuex"
import { Context as AppContext } from "@nuxt/types"
import { RootState } from "~/types"

export const state = (): RootState => ({})

export const mutations: MutationTree<RootState> = {}

interface Actions<S, R> extends ActionTree<S, R> {
	nuxtServerInit(actionContext: ActionContext<S, R>, appContext: AppContext): void
}

export const actions: Actions<RootState, RootState> = {
	async nuxtServerInit({ commit }, context) {}
}
