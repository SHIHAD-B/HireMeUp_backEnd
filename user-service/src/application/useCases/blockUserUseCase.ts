import { IDependencies } from "../../domain/interfaces";

export const blockUserUseCase = (dependencies: IDependencies) => {
    const { repositories: { blockUser } } = dependencies

    return {
        execute: async (email: string) => {
            try {
                return await blockUser(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}