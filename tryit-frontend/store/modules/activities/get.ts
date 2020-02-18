// import { GetterTree } from 'vuex';
// import { ActivitiesState } from './index';
// import { RootState, ActivityResource, ActivitySelect } from '~/types';

// type SortedActivities = {[day:number] : ActivitySelect[]}

// export const getters: GetterTree<ActivitiesState, RootState> = {
//     getOrganizers(state): SortedActivities | undefined {
//         let { activities } = state
//         const dict : SortedActivities = {}
//         if(activities != undefined){
//             activities.forEach(activity => {
//                 dict[activity.date ].push(activity.activity)
//             });
//         }
//         return dict
//     }
// };