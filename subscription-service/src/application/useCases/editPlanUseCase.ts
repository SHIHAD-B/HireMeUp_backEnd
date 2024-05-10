import { IPlans } from "../../domain/entities/plan.entity";
import { IDependencies } from "../../domain/interfaces";


export const editPlansUseCase = (dependencies: IDependencies) => {
    const { repositories: { editPlans } } = dependencies
    return {
        execute: async (data: IPlans) => {
            try {
                return await editPlans(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}