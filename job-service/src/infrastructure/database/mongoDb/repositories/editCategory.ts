import { ICategory } from "../../../../domain/entities";
import Category from "../model/categorySchema";

export const editCategory = async (data: ICategory): Promise<ICategory | null | boolean> => {
    try {
        if (!data) {
            return null
        }
        const categoryRegex = new RegExp(`^${data.category}$`, 'i');
        const queryConditions = {
            category: categoryRegex,
            _id: { $ne: data._id }
        };
        const existingCategory = await Category.findOne(queryConditions);
        if (existingCategory) {
            return false
        }


        const editedCategory = await Category.updateOne({ _id: data._id }, data, { new: true });
        if (editedCategory.modifiedCount === 0) {
            return null
        }
        return await Category.findOne({ _id: data._id })

    } catch (error: any) {
        console.error('error in editing category', error)
        throw new Error('error in editing category...')
    }
}