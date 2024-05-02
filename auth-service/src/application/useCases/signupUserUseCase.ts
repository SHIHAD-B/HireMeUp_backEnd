import { IUserEntity } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";

export const signupUserUseCase =  (dependencies: IDependencies) => {
    const { repositories: { userSignup } } = dependencies

    return {
        execute: async (data: IUserEntity) => {
            try {
                return await userSignup(data) as IUserEntity
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}