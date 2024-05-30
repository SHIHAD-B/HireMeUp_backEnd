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
exports.editEmployee = void 0;
const employeeSchema_1 = __importDefault(require("../model/employeeSchema"));
const editEmployee = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(data === null || data === void 0 ? void 0 : data.email)) {
            return null;
        }
        const employee = yield employeeSchema_1.default.findOne({ _id: data._id });
        if (!employee) {
            return null;
        }
        const existEmployee = yield employeeSchema_1.default.findOne({
            email: data.email,
            companyId: data.companyId,
            _id: { $ne: data._id }
        });
        if (existEmployee) {
            return null;
        }
        const updateEmployee = yield employeeSchema_1.default.updateOne({ _id: data._id }, data, { new: true });
        if (updateEmployee.modifiedCount > 0) {
            return yield employeeSchema_1.default.findOne({ email: data.email });
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error('Error editing employee:', error);
        throw new Error('Failed to edit  employee.');
    }
});
exports.editEmployee = editEmployee;
