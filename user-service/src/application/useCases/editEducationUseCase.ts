import { IEducation } from "../../domain/entities/education.entities";
import { IDependencies } from "../../domain/interfaces";


export const editEducationUseCase = (dependencies: IDependencies) => {
    const { repositories: {editEducation} } = dependencies
    return {
        execute: async (id: string, data:IEducation) => {
            try {
                return await editEducation(id, data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}