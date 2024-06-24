import { IAdmin } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";


export const editAdminUseCase = (dependencies: IDependencies) => {
    const { repositories: { editAdmin } } = dependencies
    return {
        execute: async (data:IAdmin) => {
            try {
                return await editAdmin( data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}