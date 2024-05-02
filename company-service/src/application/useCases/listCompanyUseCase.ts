import { IDependencies } from "../../domain/interfaces";

export const listCompanyUseCase = (dependencies: IDependencies) => {
    const { repositories: { listCompany } } = dependencies

    return {
        execute: async () => {
            try {
                return await listCompany()
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}