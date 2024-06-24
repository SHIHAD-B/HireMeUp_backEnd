
import { ISchedule } from "../entities/schedule.entity";

export interface ISchduleInterviewUseCase {
    execute(data:ISchedule): Promise<ISchedule | null | boolean>
}