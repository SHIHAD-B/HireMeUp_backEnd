import { IDependencies } from "../../domain/interfaces";

export const deleteUserUseCase =  (dependencies: IDependencies) => {
    const { repositories: { deleteUser } } = dependencies
    return {
        execute: async (email: string) => {
            try {
                return await deleteUser(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}