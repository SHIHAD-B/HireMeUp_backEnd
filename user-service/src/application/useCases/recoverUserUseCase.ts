import { IDependencies } from "../../domain/interfaces";

export const recoverUserUseCase =  (dependencies: IDependencies) => {
    const { repositories: { recoverUser } } = dependencies
    return {
        execute: async (email: string) => {
            try {
                return await recoverUser(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}