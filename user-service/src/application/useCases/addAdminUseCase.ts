import { IAdmin } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";


export const addAdminUseCase = (dependencies: IDependencies) => {
    const { repositories: { addAdmin } } = dependencies
    return {
        execute: async (data:IAdmin) => {
            try {
                return await addAdmin(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}