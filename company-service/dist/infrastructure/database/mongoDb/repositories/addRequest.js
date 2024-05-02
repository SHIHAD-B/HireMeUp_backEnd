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
exports.addRequest = void 0;
const requestSchema_1 = __importDefault(require("../model/requestSchema"));
const addRequest = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data || !data.email) {
            return null;
        }
        else {
            const requestExist = yield requestSchema_1.default.findOne({ email: data.email });
            if ((requestExist === null || requestExist === void 0 ? void 0 : requestExist.approval) == "rejected") {
                return false;
            }
            if ((requestExist === null || requestExist === void 0 ? void 0 : requestExist.status) === "secondAttempt") {
                data.approval = "rejected";
                yield requestSchema_1.default.updateOne({ email: data.email }, { $set: { approval: "rejected" } });
                return false;
            }
            if ((requestExist === null || requestExist === void 0 ? void 0 : requestExist.status) === "firstAttempt") {
                data.status = "secondAttempt";
            }
            else {
                data.status = "firstAttempt";
            }
            data.approval = "inProgress";
            const request = yield requestSchema_1.default.findOneAndUpdate({ email: data.email }, { $set: data }, { upsert: true, new: true });
            return request;
        }
    }
    catch (error) {
        console.error('Error adding request:', error);
        throw new Error('Failed to add request..');
    }
});
exports.addRequest = addRequest;
