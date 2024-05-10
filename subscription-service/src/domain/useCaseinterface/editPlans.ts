import { IPlans } from "../entities/plan.entity";

export interface IEditUseCase {
    execute(data:IPlans): Promise<boolean | null>
}