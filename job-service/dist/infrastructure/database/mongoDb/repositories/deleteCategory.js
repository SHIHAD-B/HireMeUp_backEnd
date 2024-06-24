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
exports.deleteCategory = void 0;
const categorySchema_1 = __importDefault(require("../model/categorySchema"));
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id) {
            return null;
        }
        const cate = yield categorySchema_1.default.findOne({ _id: id });
        if (!cate) {
            return null;
        }
        const deletedCategory = yield categorySchema_1.default.updateOne({ _id: id }, { deleted: !cate.deleted });
        return deletedCategory.modifiedCount > 0 ? true : false;
    }
    catch (error) {
        console.error('error in delting category', error);
        throw new Error('error in deleting category');
    }
});
exports.deleteCategory = deleteCategory;
