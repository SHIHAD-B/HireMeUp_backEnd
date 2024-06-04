import { ISubscriptions } from "../entities"

export interface IupgradeSubscriptionUseCase {
    execute(data:ISubscriptions): Promise<ISubscriptions| boolean | null>
}