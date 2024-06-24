import { IDependencies } from "../../domain/interface";

export const fetchScheduleUseCase = (dependencies: IDependencies) => {
    const { repositories: { fetchSchedule } } = dependencies

    return {
        execute: async (id:string) => {
            try {
                return await fetchSchedule(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}