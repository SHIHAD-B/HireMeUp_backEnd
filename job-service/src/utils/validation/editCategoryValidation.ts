import joi from "joi";

export const editCategoryValidation = joi.object({
    id: joi.string().required(),
    description: joi.string().min(5),
    category: joi.string().min(4).max(20)
}).xor('description', 'category').with('description', 'category').with('category', 'description').error(new Error('Either description or category must be provided'));
