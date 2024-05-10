import { IDependencies } from "../../domain/interfaces";

export const unblockCompanyUseCase = (dependencies: IDependencies) => {
    const { repositories: { unblockCompany } } = dependencies

    return {
        execute: async (email: string) => {
            try {
                return await unblockCompany(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}