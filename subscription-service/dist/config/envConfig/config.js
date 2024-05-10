"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.DB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_USERNAME = String(process.env.MONGODB_USERNAME);
const MONGODB_PASSWORD = String(process.env.MONGODB_PASSWORD);
const DB_URL = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.rps7pnn.mongodb.net/hiremeupSubscriptionService?retryWrites=true&w=majority`;
exports.DB_URL = DB_URL;
const PORT = Number(process.env.PORT);
exports.PORT = PORT;
