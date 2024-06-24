"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./presentation/server"));
const config_1 = require("./config/envConfig/config");
const dbConnection_1 = __importDefault(require("./infrastructure/database/dbConnection"));
const node_cron_1 = __importDefault(require("node-cron"));
const remainderMailer_1 = require("./infrastructure/cronJob/remainderMailer");
const expireInterview_1 = require("./infrastructure/cronJob/expireInterview");
const expireJobs_1 = require("./infrastructure/cronJob/expireJobs");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        node_cron_1.default.schedule('*/10 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
            console.log('Running cron job...');
            try {
                yield (0, remainderMailer_1.reminderMailer)();
                yield (0, expireInterview_1.expireInterview)();
                yield (0, expireJobs_1.updateExpiredJobs)();
            }
            catch (error) {
                console.error('Error running vron job:', error);
            }
        }));
        server_1.default;
        console.log(`job Server is running on port ${config_1.PORT}`);
        yield (0, dbConnection_1.default)()
            .then(() => {
            console.log("job-service is connected to the database");
        })
            .catch(error => {
            console.error("Error connecting to the database:", error);
            throw new Error("Error connecting to the database");
        });
    }
    catch (error) {
        console.error("Issue in running the server:", error);
        throw new Error("Issue in running the server.....");
    }
}))();
