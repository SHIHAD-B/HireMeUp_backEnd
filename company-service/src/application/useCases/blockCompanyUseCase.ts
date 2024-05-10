import { IDependencies } from "../../domain/interfaces";

export const blockCompanyUseCase = (dependencies: IDependencies) => {
    const { repositories: { blockCompany } } = dependencies

    return {
        execute: async (email: string) => {
            try {
                return await blockCompany(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}