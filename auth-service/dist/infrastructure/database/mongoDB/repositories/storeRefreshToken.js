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
exports.storeRefreshToken = void 0;
const refreshTokenSchema_1 = __importDefault(require("../model/refreshTokenSchema"));
const storeRefreshToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data || !data.token || !data.coreId || !data.expiryDate) {
            return null;
        }
        const updatedRefreshToken = yield refreshTokenSchema_1.default.findOneAndUpdate({ coreId: data.coreId }, {
            token: data.token,
            expiryDate: data.expiryDate,
        }, { new: true, upsert: true });
        return updatedRefreshToken;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.storeRefreshToken = storeRefreshToken;
