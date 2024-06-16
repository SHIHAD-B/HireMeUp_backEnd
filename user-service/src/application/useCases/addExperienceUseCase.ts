import { IExperience } from "../../domain/entities/experience.entity";
import { IDependencies } from "../../domain/interfaces";


export const addExperienceUseCase = (dependencies: IDependencies) => {
    const { repositories: { addExperience } } = dependencies
    return {
        execute: async (id: string, data:IExperience) => {
            try {
                return await addExperience(id, data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}