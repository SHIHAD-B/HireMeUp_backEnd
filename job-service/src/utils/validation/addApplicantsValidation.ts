import joi from 'joi'

export const addApplicantsValidation = joi.object({
    jobId: joi.string().required(),
    companyId: joi.string().required(),
    userId: joi.string().required(),
    hiring_status: joi.string().allow(null).optional(),
    answers:joi.array().items(joi.object()).optional(),
    resume: joi.string().required(),
    hiring_info: joi.array().items(joi.object({
        name: joi.string().allow(null).optional(),
        notes: joi.string().allow(null).optional()
    })).optional(),
})


