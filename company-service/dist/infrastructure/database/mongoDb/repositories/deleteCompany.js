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
exports.deleteCompany = void 0;
const companySchema_1 = __importDefault(require("../model/companySchema"));
const deleteCompany = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!email) {
            return null;
        }
        const company = yield companySchema_1.default.findOne({ email: email });
        if (!company) {
            return null;
        }
        const blockedCompany = yield companySchema_1.default.updateOne({ email: email }, {
            status: "blocked",
            deleted: true
        }, { new: true });
        return blockedCompany.modifiedCount > 0 ? true : false;
    }
    catch (error) {
        console.error('Error deleting company:', error);
        throw new Error('Failed to delete  company.');
    }
});
exports.deleteCompany = deleteCompany;
