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
exports.addEmployee = void 0;
const employeeSchema_1 = __importDefault(require("../model/employeeSchema"));
const addEmployee = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data || !data.email) {
            return null;
        }
        const existingEmployee = yield employeeSchema_1.default.findOne({ companyId: data.companyId, email: data.email });
        if (existingEmployee) {
            return false;
        }
        else {
            const newEmployee = yield employeeSchema_1.default.create(data);
            return newEmployee;
        }
    }
    catch (error) {
        console.error('Error adding employee:', error);
        throw new Error('Failed to add employee.');
    }
});
exports.addEmployee = addEmployee;
