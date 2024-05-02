import { IDependencies } from "../../domain/interfaces";
import { IUsers } from "../../domain/entities/user.entity";

export const updateUserUseCase = (dependencies: IDependencies) => {
    const { repositories: { updateUser } } = dependencies
    return {
        execute: async (data: IUsers) => {
            try {
                return await updateUser(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}