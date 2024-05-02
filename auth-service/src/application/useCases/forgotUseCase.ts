
import { IDependencies } from "../../domain/interfaces";

export const forgotUseCase =  (dependencies: IDependencies) => {
    const { repositories: { forgot } } = dependencies

    return {
        execute: async (email: string) => {
            try {
                return await forgot(email)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}