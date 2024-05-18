import Category from "../model/categorySchema";

export const deleteCategory = async (id: string): Promise<boolean | null> => {
    try {
        if (!id) {
            return null
        }
        const deletedCategory = await Category.updateOne({ _id: id }, { deleted: true })
        return deletedCategory.modifiedCount > 0 ? true : false
    } catch (error: any) {
        console.error('error in delting category', error)
        throw new Error('error in deleting category')
    }
}