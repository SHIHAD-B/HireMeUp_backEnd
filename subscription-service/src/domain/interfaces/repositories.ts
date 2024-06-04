import { IPlans } from "../entities/plan.entity"
import { ISubscriptions } from "../entities/subscription.entity"

export interface IRepositories {
    fetchPlans: () => Promise<IPlans[] | null>
    addPlans: (data: IPlans) => Promise<IPlans | null>
    deletePlans: (id: string) => Promise<boolean | null>
    editPlans: (data: IPlans) => Promise<boolean | null>
    PlanExists: (name: string) => Promise<IPlans[] | null>
    upgradeSubscription: (data: ISubscriptions) => Promise<ISubscriptions |boolean | null>

}