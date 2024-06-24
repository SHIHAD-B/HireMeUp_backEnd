
import { ISchedule } from "../entities/schedule.entity";


export interface IUpdateScheduleStatusUseCase {
    execute(id: string, status: string): Promise<ISchedule | null>
}