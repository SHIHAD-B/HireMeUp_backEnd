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
exports.addSubscription = void 0;
const userSchema_1 = __importDefault(require("../model/userSchema"));
const addSubscription = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data) {
            return null;
        }
        const user = yield userSchema_1.default.findOne({ _id: data.userId });
        if (!user) {
            return false;
        }
        const subscriptionData = {
            subscriptionId: data.subscriptionId,
            planId: data.planId,
            name: data.name,
            end_date: data.end_date,
            start_date: new Date(),
            createdAt: new Date()
        };
        const updateResult = yield userSchema_1.default.updateOne({ _id: data.userId }, { $set: { subscription: subscriptionData } });
        if (updateResult.modifiedCount > 0) {
            return yield userSchema_1.default.findOne({ _id: data.userId });
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error('Error adding subscription:', error);
        throw new Error('Failed to add subscription.');
    }
});
exports.addSubscription = addSubscription;
