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
exports.editPlans = void 0;
const planSchema_1 = __importDefault(require("../model/planSchema"));
const editPlans = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data) {
            return null;
        }
        data.editedAt = new Date();
        const plans = yield planSchema_1.default.updateOne({ _id: data._id }, { $set: data });
        if (plans.modifiedCount == 1) {
            return true;
        }
        return null;
    }
    catch (error) {
        console.error('Error editing plans:', error);
        throw new Error('Failed to edit plans..');
    }
});
exports.editPlans = editPlans;
