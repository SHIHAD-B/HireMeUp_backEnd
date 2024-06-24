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
exports.updateExpiredJobs = void 0;
const jobSchema_1 = __importDefault(require("../database/mongoDb/model/jobSchema"));
const updateExpiredJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const expiredJobs = yield jobSchema_1.default.updateMany({ end_date: { $lt: currentDate }, deleted: false }, { $set: { deleted: true } });
        console.log(`Updated ${expiredJobs.modifiedCount} expired jobs.`);
    }
    catch (error) {
        console.error('Error updating expired jobs:', error);
        throw error;
    }
});
exports.updateExpiredJobs = updateExpiredJobs;
