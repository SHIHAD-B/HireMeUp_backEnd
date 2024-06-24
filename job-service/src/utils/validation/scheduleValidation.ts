import joi from 'joi'

export const scheduleValidation = joi.object({
    companyId: joi.string().required(),
    userId: joi.string().required(),
    jobId: joi.string().required(),
    interviewer: joi.string().required(),
    title: joi.string().allow(null).optional(),
    status: joi.string().allow(null).optional(),
    date: joi.date().allow(null).optional()
})


