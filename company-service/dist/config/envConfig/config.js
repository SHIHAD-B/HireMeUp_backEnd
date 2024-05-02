"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RABBITMQ_URL = exports.DB_URL = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = Number(process.env.PORT);
exports.PORT = PORT;
const MONGODB_USERNAME = String(process.env.MONGODB_USERNAME);
const MONGODB_PASSWORD = String(process.env.MONGODB_PASSWORD);
const DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.rps7pnn.mongodb.net/hiremeupCompanyService?retryWrites=true&w=majority`;
exports.DB_URL = DB_URL;
const RABBITMQ_URL = String(process.env.RABBITMQ_URL);
exports.RABBITMQ_URL = RABBITMQ_URL;
