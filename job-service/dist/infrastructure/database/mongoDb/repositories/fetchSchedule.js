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
exports.fetchSchedule = void 0;
const scheduleSchema_1 = __importDefault(require("../model/scheduleSchema"));
const fetchSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const company = yield scheduleSchema_1.default.find({ companyId: id });
        const user = yield scheduleSchema_1.default.find({ userId: id });
        if (!company && !user) {
            return null;
        }
        if (user.length) {
            return user;
        }
        else if (company.length) {
            return company;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('error occured in fetching the schedule', error);
        throw new Error('Failed to fetch the schedule...');
    }
});
exports.fetchSchedule = fetchSchedule;
