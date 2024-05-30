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
exports.editCompany = void 0;
const companySchema_1 = __importDefault(require("../model/companySchema"));
const editCompany = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(data === null || data === void 0 ? void 0 : data.email)) {
            return null;
        }
        const company = yield companySchema_1.default.findOne({ email: data.email });
        if (!company) {
            return null;
        }
        const updateCompany = yield companySchema_1.default.updateOne({ email: data.email }, data, { new: true });
        if (updateCompany.modifiedCount > 0) {
            return yield companySchema_1.default.findOne({ email: data.email });
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error editing company:', error);
        throw new Error('Failed to edit  company.');
    }
});
exports.editCompany = editCompany;
