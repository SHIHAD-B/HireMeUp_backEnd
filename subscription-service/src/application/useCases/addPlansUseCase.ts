import { IPlans } from "../../domain/entities/plan.entity";
import { IDependencies } from "../../domain/interfaces";


export const addPlansUseCase = (dependencies: IDependencies) => {
    const { repositories: { addPlans } } = dependencies
    return {
        execute: async (data: IPlans) => {
            try {
                return await addPlans(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}