import { IUsers } from "../../domain/entities/user.entity";
import { IDependencies } from "../../domain/interfaces";

export const addUserUseCase = (dependencies: IDependencies) => {
    const { repositories: { addUser } } = dependencies
    return {
        execute: async (data: IUsers) => {
            try {
                return await addUser(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}