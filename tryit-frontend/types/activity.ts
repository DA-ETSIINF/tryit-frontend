import {BreakResource, WorkshopResource, TalkResource, Event} from '.'
export interface ActivityResource{
    activity: BreakResource | WorkshopResource | TalkResource | Event
    type:string
}