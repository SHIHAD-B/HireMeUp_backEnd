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
exports.editCategory = void 0;
const categorySchema_1 = __importDefault(require("../model/categorySchema"));
const editCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!data) {
            return null;
        }
        const categoryRegex = new RegExp(`^${data.category}$`, 'i');
        const queryConditions = {
            category: categoryRegex,
            _id: { $ne: data._id }
        };
        const existingCategory = yield categorySchema_1.default.findOne(queryConditions);
        if (existingCategory) {
            return false;
        }
        const editedCategory = yield categorySchema_1.default.updateOne({ _id: data._id }, data, { new: true });
        if (editedCategory.modifiedCount === 0) {
            return null;
        }
        return yield categorySchema_1.default.findOne({ _id: data._id });
    }
    catch (error) {
        console.error('error in editing category', error);
        throw new Error('error in editing category...');
    }
});
exports.editCategory = editCategory;
