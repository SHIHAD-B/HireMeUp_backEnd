"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.DB_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = Number(process.env.PORT);
const MONGODB_USERNAME = String(process.env.MONGODB_USERNAME);
const MONGODB_PASSWORD = String(process.env.MONGODB_PASSWORD);
exports.DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.rps7pnn.mongodb.net/hiremeupJobService?retryWrites=true&w=majority`;
exports.JWT_SECRET = String(process.env.JWT_SECRET);
