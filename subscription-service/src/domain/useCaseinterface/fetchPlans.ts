import { IPlans } from "../entities/plan.entity"

export interface IFetchsUseCase {
    execute(): Promise<IPlans[] | null>
}