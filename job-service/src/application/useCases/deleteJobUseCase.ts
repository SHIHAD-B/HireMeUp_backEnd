import { IDependencies } from "../../domain/interface";

export const deleteJobUseCase = (dependencies: IDependencies) => {
    const { repositories: { deleteJob } } = dependencies

    return {
        execute: async (id: string) => {
            try {
                return await deleteJob(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}