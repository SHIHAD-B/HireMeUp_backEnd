import { IPlans } from "../entities/plan.entity"

export interface IPlanExistUseCase {
    execute(name:string): Promise<IPlans | null>
}