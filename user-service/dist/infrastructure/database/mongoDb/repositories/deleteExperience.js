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
exports.deleteExperience = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const deleteExperience = (userId, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!userId || !id) {
            return null;
        }
        const user = yield userSchema_1.default.findOne({ _id: userId });
        if (!user) {
            return null;
        }
        const result = yield userSchema_1.default.updateOne({ _id: userId }, { $pull: { experiences: { _id: id } } }, { new: true });
        if (result.modifiedCount === 0) {
            return null;
        }
        return yield userSchema_1.default.findOne({ _id: userId });
    }
    catch (error) {
        console.error('Error deleting experience:', error);
        throw new Error('Failed to delete experience.');
    }
});
exports.deleteExperience = deleteExperience;
