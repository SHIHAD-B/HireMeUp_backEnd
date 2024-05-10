import { IPlans } from "../entities/plan.entity"

export interface IRepositories {
    fetchPlans: () => Promise<IPlans[] | null>
    addPlans: (data: IPlans) => Promise<IPlans | null>
    deletePlans: (id: string) => Promise<boolean | null>
    editPlans: (data: IPlans) => Promise<boolean | null>
    PlanExists :(name: string)=> Promise<IPlans[] | null>
}