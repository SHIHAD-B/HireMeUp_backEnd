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
exports.listApplicants = void 0;
const applicantsSchema_1 = __importDefault(require("../model/applicantsSchema"));
const listApplicants = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applicantsList = yield applicantsSchema_1.default.find();
        return applicantsList ? applicantsList : null;
    }
    catch (error) {
        console.error('error in listing the application', error);
        throw new Error('Failed to list the applicants..');
    }
});
exports.listApplicants = listApplicants;
