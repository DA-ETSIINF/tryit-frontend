import { ActivityResource } from "./activity";
import { DateResource } from "./date";

export interface ScheduleResource{
    activities: ActivityResource[]
    date: DateResource
}