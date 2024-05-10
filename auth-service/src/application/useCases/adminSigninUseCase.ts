import {IAdminEntity } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";

export const adminSigninUseCase = (dependencies: IDependencies) => {
    const { repositories: {adminSignin } } = dependencies

    return {
        execute: async (data: IAdminEntity) => {
            try {
                return await adminSignin(data) as IAdminEntity
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}