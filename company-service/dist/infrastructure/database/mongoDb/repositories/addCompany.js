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
exports.addCompany = void 0;
const companySchema_1 = __importDefault(require("../model/companySchema"));
const addCompany = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data) {
            return null;
        }
        const alreadyExist = yield companySchema_1.default.findOne({ email: data.email });
        if (alreadyExist) {
            return false;
        }
        const company = yield companySchema_1.default.create({
            email: data.email,
            password: data.password,
            status: 'active',
            approval: 'approved',
            deleted: false,
            company_name: data.company_name,
        });
        if (!company) {
            return null;
        }
        else {
            return company;
        }
    }
    catch (error) {
        console.error('Error approving request:', error.message);
        throw new Error('Failed to approve request.');
    }
});
exports.addCompany = addCompany;
