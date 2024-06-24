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
exports.addContactLinks = void 0;
const companySchema_1 = __importDefault(require("../model/companySchema"));
const addContactLinks = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data || !data.userId) {
            return null;
        }
        const userExist = yield companySchema_1.default.findOne({ _id: data.userId });
        if (!userExist) {
            return false;
        }
        const setData = {
            instagram: data.instagram,
            linkedIn: data.linkedIn,
            twitter: data.twitter
        };
        const updateContact = yield companySchema_1.default.updateOne({ _id: data.userId }, { $set: { contact: setData } });
        if (updateContact.modifiedCount == 0) {
            return false;
        }
        const updatedCompany = yield companySchema_1.default.findOne({ _id: data.userId });
        return updatedCompany;
    }
    catch (error) {
        console.error('Error adding request:', error);
        throw new Error('Failed to add request..');
    }
});
exports.addContactLinks = addContactLinks;
