import { IDependencies } from "../../domain/interface";

export const listCategoryUseCase = (dependencies: IDependencies) => {
    const { repositories: { listCategory } } = dependencies

    return {
        execute: async () => {
            try {
                return await listCategory()
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}