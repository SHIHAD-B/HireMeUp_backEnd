import { IDependencies } from "../../domain/interfaces";


export const deleteEducationUseCase = (dependencies: IDependencies) => {
    const { repositories: { deleteEducation } } = dependencies
    return {
        execute: async (userId: string, id:string) => {
            try {
                return await deleteEducation(userId, id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}