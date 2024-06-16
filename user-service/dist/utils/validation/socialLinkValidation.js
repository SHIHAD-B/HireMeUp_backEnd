"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialLinkValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.socialLinkValidation = joi_1.default.object({
    instagram: joi_1.default.string()
        .uri({ scheme: [/https?/] })
        .allow(null, ''),
    linkedin: joi_1.default.string()
        .uri({ scheme: [/https?/] })
        .allow(null, ''),
    portfolio: joi_1.default.string()
        .uri({ scheme: [/https?/] })
        .allow(null, ''),
    twitter: joi_1.default.string()
        .uri({ scheme: [/https?/] })
        .allow(null, ''),
});
