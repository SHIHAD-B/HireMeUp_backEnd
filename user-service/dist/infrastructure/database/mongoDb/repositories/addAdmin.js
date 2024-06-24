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
exports.addAdmin = void 0;
const adminSchema_1 = __importDefault(require("../model/adminSchema"));
const addAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data) {
            return null;
        }
        data.role = 'sub-admin';
        const user = yield adminSchema_1.default.findOne({ email: data.email });
        if (user) {
            return false;
        }
        const addAdm = yield adminSchema_1.default.create(data);
        return addAdm ? addAdm : null;
    }
    catch (error) {
        console.error('Error adding skill', error);
        throw new Error('Failed to add skill.');
    }
});
exports.addAdmin = addAdmin;
