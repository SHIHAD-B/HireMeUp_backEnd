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
exports.listRequest = void 0;
const requestSchema_1 = __importDefault(require("../model/requestSchema"));
const listRequest = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestList = yield requestSchema_1.default.find();
        if (requestList.length === 0) {
            return null;
        }
        return requestList.reverse();
    }
    catch (error) {
        console.error('Error listing companies:', error.message);
        throw new Error('Failed to list requests.');
    }
});
exports.listRequest = listRequest;
