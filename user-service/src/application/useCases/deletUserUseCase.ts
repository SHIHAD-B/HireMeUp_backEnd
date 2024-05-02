import { IDependencies } from "../../domain/interfaces";

export const deleteUserUseCase =  (dependencies: IDependencies) => {
    const { repositories: { deleteUser } } = dependencies
    return {
        execute: async (id: string) => {
            try {
                return await deleteUser(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}