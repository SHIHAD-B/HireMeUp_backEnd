"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_KEY_CLOUDINARY = exports.API_SECRET_CLOUDINARY = exports.RABBITMQ_URL = exports.APP_SECRET = exports.EMAIL = exports.JWT_SECRET = exports.PORT = exports.IP = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.IP = String(process.env.IP);
exports.PORT = Number(process.env.PORT);
exports.JWT_SECRET = String(process.env.JWT_SECRET);
exports.EMAIL = String(process.env.EMAIL);
exports.APP_SECRET = String(process.env.APP_SECRET);
exports.RABBITMQ_URL = String(process.env.RABBITMQ_URL);
exports.API_SECRET_CLOUDINARY = String(process.env.API_SECRET_CLOUDINARY);
exports.API_KEY_CLOUDINARY = String(process.env.API_KEY_CLOUDINARY);
