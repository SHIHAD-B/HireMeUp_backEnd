import { IDependencies } from "../../domain/interfaces";

export const blockUnblockAdminUserUseCase = (dependencies: IDependencies) => {
    const { repositories: { blockUnblockAdmin } } = dependencies

    return {
        execute: async (email: string) => {
            try {
                return await blockUnblockAdmin(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}