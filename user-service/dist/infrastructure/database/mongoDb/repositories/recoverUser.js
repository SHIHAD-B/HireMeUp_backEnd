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
exports.recoverUser = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const recoverUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!email) {
            return null;
        }
        const user = yield userSchema_1.default.findOne({ email: email });
        if (!user) {
            return null;
        }
        const deletedUser = yield userSchema_1.default.updateOne({ email: email }, {
            deleted: false,
            blocked: false
        }, { new: true });
        return deletedUser.modifiedCount > 0 ? true : false;
    }
    catch (error) {
        console.error('Error recovering user:', error);
        throw new Error('Failed to recover user.');
    }
});
exports.recoverUser = recoverUser;
