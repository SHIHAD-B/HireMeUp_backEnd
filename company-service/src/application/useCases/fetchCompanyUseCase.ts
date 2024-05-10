import { IDependencies } from "../../domain/interfaces";

export const fetchCompanyUseCase = (dependencies: IDependencies) => {
    const { repositories: { fetchCompany } } = dependencies

    return {
        execute: async (email: string) => {
            try {
                return await fetchCompany(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}