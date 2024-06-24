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
exports.expireInterview = void 0;
const scheduleSchema_1 = __importDefault(require("../database/mongoDb/model/scheduleSchema"));
const expireInterview = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const expiredSchedules = yield scheduleSchema_1.default.updateMany({ date: { $lt: currentDate }, status: 'upcomming' }, { $set: { status: 'cancelled', editedAt: currentDate } });
        console.log(`Expired ${expiredSchedules.modifiedCount} interviews.`);
    }
    catch (error) {
        console.error('Error expiring interviews:', error);
        throw error;
    }
});
exports.expireInterview = expireInterview;
