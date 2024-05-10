import { IDependencies } from "../../domain/interfaces";

export const unblockUserUseCase = (dependencies: IDependencies) => {
    const { repositories: { unBlockUser } } = dependencies

    return {
        execute: async (email: string) => {
            try {
                return await unBlockUser(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}