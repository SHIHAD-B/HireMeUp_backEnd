import { ICategory } from "../../../../domain/entities";
import Category from "../model/categorySchema";

export const addCategory = async (data: ICategory): Promise<ICategory | null> => {
    try {
        if (!data) {
            return null
        }
        const categoryData = {
            ...data,
            category: data.category?.toLocaleLowerCase()
        }

        const alreadyExist = await Category.findOne({ category: categoryData.category })
        if (alreadyExist) {
            return null
        }
        const jobs = await Category.create(categoryData)
        return jobs

    } catch (error: any) {
        console.error('Error add job', error)
        throw new Error('failed to add jobs...')
    }
}