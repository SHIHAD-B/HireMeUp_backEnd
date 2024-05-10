import { IDependencies } from "../../domain/interfaces";


export const resetPasswordUseCase = (dependencies: IDependencies) => {
    const { repositories: { resetPassword } } = dependencies
    return {
        execute: async (email: string, password: string) => {
            try {
                return await resetPassword(email, password)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}