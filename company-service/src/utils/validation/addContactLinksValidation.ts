import Joi from "joi";

export const ContactLinkValidation = Joi.object({
    userId: Joi.string().required(),
    instagram: Joi.string()
        .uri({ scheme: [/https?/] })
        .allow(null, ''),
    linkedIn: Joi.string()
        .uri({ scheme: [/https?/] })
        .allow(null, ''),
    twitter: Joi.string()
        .uri({ scheme: [/https?/] })
        .allow(null, ''),
});