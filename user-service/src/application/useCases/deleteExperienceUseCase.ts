import { IDependencies } from "../../domain/interfaces";


export const deleteExperienceUseCase = (dependencies: IDependencies) => {
    const { repositories: { deleteExperience } } = dependencies
    return {
        execute: async (userId: string, id:string) => {
            try {
                return await deleteExperience(userId, id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}