
import { ISchedule } from "../entities/schedule.entity";

export interface IFetchScheduleUseCase {
    execute(id:string): Promise<ISchedule[] | null>
}