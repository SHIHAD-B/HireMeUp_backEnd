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
exports.addApplicants = void 0;
const applicantsSchema_1 = __importDefault(require("../model/applicantsSchema"));
const addApplicants = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data) {
            return null;
        }
        const AlreadyExist = yield applicantsSchema_1.default.findOne({ jobId: data.jobId, userId: data.userId });
        if (AlreadyExist) {
            return null;
        }
        const addedApplicants = yield applicantsSchema_1.default.create(data);
        return addedApplicants;
    }
    catch (error) {
        console.error("error occured in adding applicants", error);
        throw new Error('Failed to add applicants...');
    }
});
exports.addApplicants = addApplicants;
