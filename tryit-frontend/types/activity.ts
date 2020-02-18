import {BreakResource, WorkshopResource, TalkResource, Event} from '.'
export interface ActivityResource{
    activity: ActivitySelect
    type:string
    date:number
}
export type ActivitySelect = BreakResource | WorkshopResource | TalkResource | Event