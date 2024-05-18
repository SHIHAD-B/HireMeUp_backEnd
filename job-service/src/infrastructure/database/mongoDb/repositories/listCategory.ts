import { ICategory } from "../../../../domain/entities";
import Category from "../model/categorySchema";

export const listCategory = async (): Promise<ICategory[] | null> => {
    try {
        const CategoryList = await Category.find()
        return CategoryList ? CategoryList : null

    } catch (error: any) {
        console.error('error in listing category', error)
        throw new Error('Failed to  list category..')
    }
}