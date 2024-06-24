import { ISchedule } from "../../domain/entities/schedule.entity";
import { IDependencies } from "../../domain/interface";

export const scheduleInterviewUseCase = (dependencies: IDependencies) => {
    const { repositories: { scheduleInterview } } = dependencies

    return {
        execute: async (data:ISchedule) => {
            try {
                return await scheduleInterview(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}