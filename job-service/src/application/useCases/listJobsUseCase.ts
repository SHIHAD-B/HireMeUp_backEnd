import { IDependencies } from "../../domain/interface";

export const listJobsUseCase = (dependencies: IDependencies) => {
    const { repositories: { listJobs } } = dependencies

    return {
        execute: async () => {
            try {
                return await listJobs()
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}