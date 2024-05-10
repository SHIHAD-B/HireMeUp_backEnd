import { IDependencies } from "../../domain/interfaces";

export const recoverCompanyUseCase = (dependencies: IDependencies) => {
    const { repositories: { recoverCompany } } = dependencies

    return {
        execute: async (email: string) => {
            try {
                return await recoverCompany(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}