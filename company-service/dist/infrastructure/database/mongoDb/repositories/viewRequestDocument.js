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
exports.viewRequestDocument = void 0;
const requestSchema_1 = __importDefault(require("../model/requestSchema"));
const viewRequestDocument = (id, document) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(id, "id from the front end");
        if (!id) {
            return null;
        }
        const request = yield requestSchema_1.default.findOne({ _id: id });
        console.log(request, "data in the view docu");
        if (!request) {
            return null;
        }
        const updateResult = yield requestSchema_1.default.updateOne({ _id: id }, { $set: { [`viewdocument.${document}`]: true } });
        if (updateResult.modifiedCount === 1) {
            return true;
        }
        return null;
    }
    catch (error) {
        console.error('Error updating request:', error.message);
        throw new Error('Failed to update request.');
    }
});
exports.viewRequestDocument = viewRequestDocument;
