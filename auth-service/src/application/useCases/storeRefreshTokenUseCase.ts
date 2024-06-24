import { IRefreshToken, IUserEntity } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";

export const storeRefreshTokenUseCase =  (dependencies: IDependencies) => {
    const { repositories: { storeRefreshToken } } = dependencies

    return {
        execute: async (data: IRefreshToken) => {
            try {
                return await storeRefreshToken(data) 
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}