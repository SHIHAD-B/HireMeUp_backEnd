import { IDependencies } from "../../domain/interface";

export const fetchJobsUseCase = (dependencies: IDependencies) => {
    const { repositories: { fetchJobs } } = dependencies

    return {
        execute: async (id:string) => {
            try {
                return await fetchJobs(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}