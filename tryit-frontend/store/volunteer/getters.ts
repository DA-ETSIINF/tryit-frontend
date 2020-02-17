import { GetterTree } from "vuex"
import { VolunteerState } from "./index"
import { RootState } from "~/types"

export const getters: GetterTree<VolunteerState, RootState> = {
	volunteerPeriods: state => state.volunteerPeriods
}
export default getters
