import { IDependencies } from "../../domain/interfaces";


export const PlanExistsUseCase = (dependencies: IDependencies) => {
    const { repositories: { PlanExists } } = dependencies
    return {
        execute: async (name:string) => {
            try {
                return await PlanExists(name)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}