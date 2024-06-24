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
exports.updateReadStatus = void 0;
const notificationSchema_1 = __importDefault(require("../model/notificationSchema"));
const updateReadStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id) {
            return null;
        }
        const updateNotification = yield notificationSchema_1.default.updateMany({ recipient: id }, { $set: { read: true } });
        if ((updateNotification === null || updateNotification === void 0 ? void 0 : updateNotification.modifiedCount) === 0) {
            return null;
        }
        return true;
    }
    catch (error) {
        console.error('Error fetching notification', error);
        throw new Error('Failed to fetch notification.');
    }
});
exports.updateReadStatus = updateReadStatus;
