import { ICategory } from "../../domain/entities";
import { IDependencies } from "../../domain/interface";

export const editCategoryUseCase = (dependencies: IDependencies) => {
    const { repositories: { editCategory } } = dependencies

    return {
        execute: async (data: ICategory) => {
            try {
                return await editCategory(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}