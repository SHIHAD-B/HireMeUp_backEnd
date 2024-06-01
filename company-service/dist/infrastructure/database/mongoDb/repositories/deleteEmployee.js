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
exports.deleteEmployee = void 0;
const employeeSchema_1 = __importDefault(require("../model/employeeSchema"));
const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id) {
            return null;
        }
        const employee = yield employeeSchema_1.default.findOne({ _id: id });
        if (!employee) {
            return null;
        }
        const blockedEmployee = yield employeeSchema_1.default.updateOne({ _id: id }, {
            isActive: false,
            deleted: true
        }, { new: true });
        return blockedEmployee.modifiedCount > 0 ? true : false;
    }
    catch (error) {
        console.error('Error deleting employee:', error);
        throw new Error('Failed to delete  employee.');
    }
});
exports.deleteEmployee = deleteEmployee;
