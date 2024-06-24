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
exports.expireSubscriptions = void 0;
const userSchema_1 = __importDefault(require("../database/mongoDb/model/userSchema"));
const expireSubscriptions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDate = new Date();
        const expiredUsers = yield userSchema_1.default.updateMany({ 'subscription.end_date': { $lt: currentDate } }, {
            $push: {
                expiredSubscriptions: {
                    subscriptionId: '$subscription.subscriptionId',
                    planId: '$subscription.planId',
                    name: '$subscription.name',
                    start_date: '$subscription.start_date',
                    end_date: '$subscription.end_date',
                    createdAt: '$subscription.createdAt'
                }
            },
            $unset: { subscription: 1 }
        });
        console.log(`Expired subscriptions for ${expiredUsers.modifiedCount} users.`);
    }
    catch (error) {
        console.error('Error expiring subscriptions:', error);
        throw error;
    }
});
exports.expireSubscriptions = expireSubscriptions;
