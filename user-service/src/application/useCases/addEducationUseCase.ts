import { IEducation } from "../../domain/entities/education.entities";
import { IDependencies } from "../../domain/interfaces";


export const addEducationUseCase = (dependencies: IDependencies) => {
    const { repositories: { addEducation } } = dependencies
    return {
        execute: async (id: string, data:IEducation) => {
            try {
                return await addEducation(id, data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}