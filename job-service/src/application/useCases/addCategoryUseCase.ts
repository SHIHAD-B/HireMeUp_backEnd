import { ICategory } from "../../domain/entities";
import { IDependencies } from "../../domain/interface";

export const addCategoryUseCase = (dependencies: IDependencies) => {
    const { repositories: { addCategory } } = dependencies

    return {
        execute: async (data: ICategory) => {
            try {
                return await addCategory(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}