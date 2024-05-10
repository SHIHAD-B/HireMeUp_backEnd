import { IDependencies } from "../../domain/interfaces";

export const deleteCompanyUseCase = (dependencies: IDependencies) => {
    const { repositories: { deleteCompany } } = dependencies

    return {
        execute: async (email: string) => {
            try {
                return await deleteCompany(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}