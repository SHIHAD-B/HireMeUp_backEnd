import { IUserEntity } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";

export const signinUserUseCase = (dependencies: IDependencies) => {
    const { repositories: { userSignin } } = dependencies

    return {
        execute: async (data: IUserEntity) => {
            try {
                return await userSignin(data) as IUserEntity
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}