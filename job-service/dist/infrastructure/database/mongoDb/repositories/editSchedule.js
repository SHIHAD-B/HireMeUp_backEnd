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
exports.editSchedule = void 0;
const scheduleSchema_1 = __importDefault(require("../model/scheduleSchema"));
const dayjs_1 = __importDefault(require("dayjs"));
const isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
dayjs_1.default.extend(isBetween_1.default);
const editSchedule = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data) {
            return null;
        }
        const existingSchedules = yield scheduleSchema_1.default.find({
            userId: data.userId,
            companyId: data.companyId,
            _id: { $ne: data._id }
        });
        const newDate = (0, dayjs_1.default)(String(data.date));
        const hasConflict = existingSchedules.some((item) => {
            const existingDate = (0, dayjs_1.default)(item.date);
            return newDate.isBetween(existingDate.subtract(30, 'minute'), existingDate.add(30, 'minute'), null, '[]');
        });
        if (hasConflict) {
            return null;
        }
        const editedJob = yield scheduleSchema_1.default.updateOne({ _id: data._id }, data);
        if (editedJob.modifiedCount === 0) {
            return null;
        }
        return yield scheduleSchema_1.default.findOne({ _id: data._id });
    }
    catch (error) {
        console.error('error occurred in editing schedule', error);
        throw new Error('Failed to edit schedule');
    }
});
exports.editSchedule = editSchedule;
