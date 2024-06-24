
import { ISchedule } from "../entities/schedule.entity";

export interface IEditSchedule {
    execute(data: ISchedule): Promise<ISchedule | null>
}