"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_URL = exports.PORT = exports.Fron_End_Ip = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.Fron_End_Ip = String(process.env.IP);
exports.PORT = Number(process.env.PORT);
const MONGODB_USERNAME = String(process.env.MONGODB_USERNAME);
const MONGODB_PASSWORD = String(process.env.MONGODB_PASSWORD);
exports.DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.rps7pnn.mongodb.net/hiremeupChatService?retryWrites=true&w=majority`;
