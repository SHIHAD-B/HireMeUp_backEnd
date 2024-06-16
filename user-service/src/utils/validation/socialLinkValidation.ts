import Joi from "joi";

export const socialLinkValidation = Joi.object({
    instagram: Joi.string()
    .uri({ scheme: [/https?/] })
    .allow(null, ''),
  linkedin: Joi.string()
    .uri({ scheme: [/https?/] })
    .allow(null, ''),
  portfolio: Joi.string()
    .uri({ scheme: [/https?/] })
    .allow(null, ''),
  twitter: Joi.string()
    .uri({ scheme: [/https?/] })
    .allow(null, ''),
});