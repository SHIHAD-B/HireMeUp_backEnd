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
exports.reminderMailer = void 0;
const sendScheduleMail_1 = require("../../utils/mails/sendScheduleMail");
const scheduleSchema_1 = __importDefault(require("../database/mongoDb/model/scheduleSchema"));
const client_1 = __importDefault(require("../rabbitmq/client"));
const reminderMailer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield scheduleSchema_1.default.find();
        const now = new Date();
        const thirtyMinutesLater = new Date(now.getTime() + 30 * 60000);
        for (const item of check) {
            const itemDate = new Date(String(item === null || item === void 0 ? void 0 : item.date));
            if (itemDate > now && itemDate <= thirtyMinutesLater) {
                const client = yield client_1.default.getInstance();
                const data = {
                    id: item.userId
                };
                const result = yield client.produce(data, "fetchUser", "toUser");
                yield (0, sendScheduleMail_1.sendScheduleMail)(result.email, itemDate.toISOString());
            }
        }
    }
    catch (error) {
        console.error("Error in reminderMailer:", error);
    }
});
exports.reminderMailer = reminderMailer;
