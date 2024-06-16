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
exports.deleteLanguage = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const deleteLanguage = (id, lang) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id || !lang) {
            return null;
        }
        const user = yield userSchema_1.default.findOne({ _id: id });
        if (!user) {
            return null;
        }
        const result = yield userSchema_1.default.updateOne({ _id: id }, { $pull: { language: lang } }, { new: true });
        if (result.modifiedCount === 0) {
            return null;
        }
        return yield userSchema_1.default.findOne({ _id: id });
    }
    catch (error) {
        console.error('Error deleting language:', error);
        throw new Error('Failed to delete language.');
    }
});
exports.deleteLanguage = deleteLanguage;
