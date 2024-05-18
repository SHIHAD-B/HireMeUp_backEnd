import { IDependencies } from "../../domain/interface";

export const deleteCategoryUseCase = (dependencies: IDependencies) => {
    const { repositories: { deleteCategory } } = dependencies
    return {
        execute: async (id: string) => {
            try {
                return await deleteCategory(id)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}