import { ISchedule } from "../../domain/entities/schedule.entity";
import { IDependencies } from "../../domain/interface";

export const editScheduleUseCase = (dependencies: IDependencies) => {
    const { repositories: { editSchedule } } = dependencies

    return {
        execute: async (data: ISchedule) => {
            try {
                return await editSchedule(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}