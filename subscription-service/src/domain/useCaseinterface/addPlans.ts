import { IPlans } from "../entities/plan.entity"

export interface IAddUseCase {
    execute(data:IPlans): Promise<IPlans | null>
}