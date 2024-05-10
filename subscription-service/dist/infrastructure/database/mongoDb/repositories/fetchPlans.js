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
exports.fetchPlans = void 0;
const planSchema_1 = __importDefault(require("../model/planSchema"));
const fetchPlans = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plans = yield planSchema_1.default.find({});
        return plans;
    }
    catch (error) {
        console.error('Error fetching plans:', error);
        throw new Error('Failed to fetch plans..');
    }
});
exports.fetchPlans = fetchPlans;
