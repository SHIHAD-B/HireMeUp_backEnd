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
exports.updateScheduleStatus = void 0;
const scheduleSchema_1 = __importDefault(require("../model/scheduleSchema"));
const updateScheduleStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id || !status) {
            return null;
        }
        const editedStatus = yield scheduleSchema_1.default.updateOne({ _id: id }, { $set: { status: status } });
        if (editedStatus.modifiedCount === 0) {
            return null;
        }
        return yield scheduleSchema_1.default.findOne({ _id: id });
    }
    catch (error) {
        console.error('error occured in editing job', error);
        throw new Error('Failed to edit job');
    }
});
exports.updateScheduleStatus = updateScheduleStatus;
