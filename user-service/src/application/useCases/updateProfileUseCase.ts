import { IDependencies } from "../../domain/interfaces";


export const updateProfielUseCase = (dependencies: IDependencies) => {
    const { repositories: { updateProfile } } = dependencies
    return {
        execute: async (id: string, data: string, field: string) => {
            try {
                return await updateProfile(id, data, field)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}