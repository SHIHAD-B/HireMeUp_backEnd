import { IDependencies } from "../../domain/interfaces";


export const fetchPlansUseCase = (dependencies: IDependencies) => {
    const { repositories: { fetchPlans } } = dependencies
    return {
        execute: async () => {
            try {
                return await fetchPlans()
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}