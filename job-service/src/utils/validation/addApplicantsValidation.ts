import joi from 'joi'

export const addApplicantsValidation = joi.object({
    jobId: joi.string().required(),
    companyId: joi.string().required(),
    schedule: joi.array().items(joi.object({
        date: joi.date().allow(null).optional(),
        feedback: joi.string().allow(null).optional(),
        status: joi.string().allow(null).optional(),
        time: joi.string().allow(null).optional(),
        title: joi.string().allow(null).optional(),
    })).optional(),

    userId: joi.string().required(),
    hiring_status: joi.string().allow(null).optional(),
    answers:joi.array().items(joi.object()).optional(),
    resume: joi.string().required(),
    hiring_info: joi.array().items(joi.object({
        date: joi.date().allow(null).optional(),
        interviewer: joi.string().allow(null).optional(),
        notes: joi.string().allow(null).optional(),
        status: joi.string().allow(null).optional()
    })).optional(),
})


