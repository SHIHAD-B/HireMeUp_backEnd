import { IDependencies } from "../../domain/interfaces";

export const blockUserUseCase = (dependencies: IDependencies) => {
    const { repositories: { blockUser } } = dependencies

    return {
        execute: async (id: string) => {
            try {
                return await blockUser(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}