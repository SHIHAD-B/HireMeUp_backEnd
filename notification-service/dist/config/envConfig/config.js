"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL = exports.APP_SECRET = exports.DB_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = Number(process.env.PORT);
exports.PORT = PORT;
const MONGODB_USERNAME = String(process.env.MONGODB_USERNAME);
const MONGODB_PASSWORD = String(process.env.MONGODB_PASSWORD);
const DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.rps7pnn.mongodb.net/hiremeupNotificationService?retryWrites=true&w=majority`;
exports.DB_URL = DB_URL;
const APP_SECRET = String(process.env.APP_SECRET);
exports.APP_SECRET = APP_SECRET;
const EMAIL = String(process.env.EMAIL);
exports.EMAIL = EMAIL;
