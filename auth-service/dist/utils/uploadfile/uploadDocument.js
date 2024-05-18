"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const config_1 = require("../../config/envConfig/config");
cloudinary_1.default.v2.config({
    cloud_name: 'HireMeUp',
    api_key: config_1.API_KEY_CLOUDINARY,
    api_secret: config_1.API_SECRET_CLOUDINARY
});
const uploadFile = (path) => {
    cloudinary_1.default.v2.uploader.upload(path, function (error, result) {
        if (error) {
            console.error(error);
        }
        else {
            console.log(result);
        }
    });
};
exports.uploadFile = uploadFile;
