import { ISubscriptions } from "../../domain/entities";
import { IDependencies } from "../../domain/interfaces";


export const upgradeSubscriptionUseCase = (dependencies: IDependencies) => {
    const { repositories: { upgradeSubscription } } = dependencies
    return {
        execute: async (data:ISubscriptions) => {
            try {
                return await upgradeSubscription(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}