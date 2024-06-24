"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactLinkValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ContactLinkValidation = joi_1.default.object({
    userId: joi_1.default.string().required(),
    instagram: joi_1.default.string()
        .uri({ scheme: [/https?/] })
        .allow(null, ''),
    linkedIn: joi_1.default.string()
        .uri({ scheme: [/https?/] })
        .allow(null, ''),
    twitter: joi_1.default.string()
        .uri({ scheme: [/https?/] })
        .allow(null, ''),
});
