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
exports.upgradeSubscription = void 0;
const planSchema_1 = __importDefault(require("../model/planSchema"));
const subscriptionSchema_1 = __importDefault(require("../model/subscriptionSchema"));
const upgradeSubscription = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data || !data._id || !data.userId)
            return null;
        const plan = yield planSchema_1.default.findOne({ _id: data._id });
        if (!plan)
            return false;
        const durationInMilliseconds = plan.duration * 24 * 60 * 60 * 1000;
        const upSub = {
            userId: data.userId,
            planId: data._id,
            start_date: new Date(),
            createdAt: new Date(),
            end_date: new Date(Date.now() + durationInMilliseconds),
            status: "active"
        };
        const upgradeSub = yield subscriptionSchema_1.default.create(upSub);
        if (upgradeSub) {
            return upgradeSub;
        }
        return null;
    }
    catch (error) {
        console.error('Error upgrading subscription:', error);
        throw new Error('Failed to upgrade subscription..');
    }
});
exports.upgradeSubscription = upgradeSubscription;
