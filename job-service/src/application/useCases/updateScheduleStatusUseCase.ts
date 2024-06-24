import { IDependencies } from "../../domain/interface";

export const updateScheduleStatusUseCase = (dependencies: IDependencies) => {
    const { repositories: { updateScheduleStatus } } = dependencies

    return {
        execute: async (id: string, status: string) => {
            try {
                return await updateScheduleStatus(id,status)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}