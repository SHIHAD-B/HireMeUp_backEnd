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
exports.listCategory = void 0;
const categorySchema_1 = __importDefault(require("../model/categorySchema"));
const listCategory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const CategoryList = yield categorySchema_1.default.find();
        return CategoryList ? CategoryList : null;
    }
    catch (error) {
        console.error('error in listing category', error);
        throw new Error('Failed to  list category..');
    }
});
exports.listCategory = listCategory;
