import { IDependencies } from "../../domain/interfaces";


export const deletePlansUseCase = (dependencies: IDependencies) => {
    const { repositories: { deletePlans } } = dependencies
    return {
        execute: async (id:string) => {
            try {
                return await deletePlans(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}