import { IDependencies } from "../../domain/interface";

export const fetchApplicantsUseCase = (dependencies: IDependencies) => {
    const { repositories: { fetchApplicants } } = dependencies

    return {
        execute: async (id:string) => {
            try {
                return await fetchApplicants(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}