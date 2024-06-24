import joi from 'joi';

export const addJobValidation = joi.object({
    companyId: joi.string().required(),
    description: joi.string().min(5).required(),
    salary_from: joi.number().min(0).required(),
    salary_to: joi.number().min(joi.ref('salary_from')).required(),
    responsibilities: joi.string().min(5).required(),
    questions: joi.array().items(joi.string()).min(0).optional(),
    required_skills: joi.array().items(joi.string()).min(1).required(),
    requirements: joi.string().min(5).required(),
    category: joi.string().required(),
    job_title: joi.string().required(),
    location: joi.string().empty('').allow(null).optional(),
    type: joi.string().required(),
    benefits: joi.array().items(joi.object({
        description: joi.string().allow(null).optional(),
        icon: joi.number().allow(null).optional(),
        name: joi.string().allow(null).optional()
    })).optional(),
    qualification: joi.string().required(),
    slot: joi.number().min(1).required(),
    start_date: joi.date().required(),
    end_date: joi.date().required(),
    level: joi.string().empty('').allow(null).optional()
});
