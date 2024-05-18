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
exports.addCategory = void 0;
const categorySchema_1 = __importDefault(require("../model/categorySchema"));
const addCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!data) {
            return null;
        }
        const categoryData = Object.assign(Object.assign({}, data), { category: (_a = data.category) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase() });
        const alreadyExist = yield categorySchema_1.default.findOne({ category: categoryData.category });
        if (alreadyExist) {
            return null;
        }
        const jobs = yield categorySchema_1.default.create(categoryData);
        return jobs;
    }
    catch (error) {
        console.error('Error add job', error);
        throw new Error('failed to add jobs...');
    }
});
exports.addCategory = addCategory;
