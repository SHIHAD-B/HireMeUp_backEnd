import { IExperience } from "../../domain/entities/experience.entity";
import { IDependencies } from "../../domain/interfaces";


export const editExperienceUseCase = (dependencies: IDependencies) => {
    const { repositories: {editExperience} } = dependencies
    return {
        execute: async (id: string, data:IExperience) => {
            try {
                return await editExperience(id, data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}