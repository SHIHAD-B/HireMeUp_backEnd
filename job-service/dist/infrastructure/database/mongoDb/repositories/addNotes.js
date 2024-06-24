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
exports.addNotes = void 0;
const applicantsSchema_1 = __importDefault(require("../model/applicantsSchema"));
const addNotes = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data) {
            return null;
        }
        const exist = yield applicantsSchema_1.default.findOne({ _id: data.id });
        if (!exist) {
            return null;
        }
        const push = {
            name: data.employee,
            notes: data.notes,
        };
        const updateApplicant = yield applicantsSchema_1.default.updateOne({ _id: data.id }, { $addToSet: { hiring_info: push } });
        if (updateApplicant.modifiedCount == 0) {
            return null;
        }
        const updatedData = yield applicantsSchema_1.default.findOne({ _id: data.id });
        return updatedData ? updatedData : null;
    }
    catch (error) {
        console.error("error in adding job ", error);
        throw new Error('Failed to add job..');
    }
});
exports.addNotes = addNotes;
