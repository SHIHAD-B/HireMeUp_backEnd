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
exports.blockUnblockAdmin = void 0;
const adminSchema_1 = __importDefault(require("../model/adminSchema"));
const blockUnblockAdmin = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!email) {
            return null;
        }
        const admin = yield adminSchema_1.default.findOne({ email: email });
        if (!admin) {
            return null;
        }
        const adminstatus = yield adminSchema_1.default.updateOne({ email: email }, {
            blocked: !admin.blocked
        }, { new: true });
        return adminstatus.modifiedCount > 0 ? true : false;
    }
    catch (error) {
        console.error('Error blocking/unblocking admin:', error);
        throw new Error('Failed to block/unblock admin');
    }
});
exports.blockUnblockAdmin = blockUnblockAdmin;
