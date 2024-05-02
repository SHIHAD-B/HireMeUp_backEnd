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
exports.addUser = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const addUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!data) {
            return null;
        }
        data = Object.assign(Object.assign({}, data), { blocked: (_a = data === null || data === void 0 ? void 0 : data.blocked) !== null && _a !== void 0 ? _a : false, deleted: (_b = data === null || data === void 0 ? void 0 : data.deleted) !== null && _b !== void 0 ? _b : false });
        const user = yield userSchema_1.default.create(data);
        return user;
    }
    catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Failed to add user..');
    }
});
exports.addUser = addUser;
