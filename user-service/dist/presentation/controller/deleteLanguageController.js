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
exports.deleteLanguageController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const deleteLanguageController = (dependencies) => {
    const { useCases: { deleteLanguageUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const datas = req.body;
            console.log(req.body);
            if (!datas || !datas.id || !datas.language) {
                return next(errorResponse_1.default.badRequest("data is required"));
            }
            const { id, language } = datas;
            const editedLang = yield deleteLanguageUseCase(dependencies).execute(id, language);
            if (!editedLang) {
                return next(errorResponse_1.default.forbidden("Error occured in deleting language of user"));
            }
            else {
                return res.status(200).send({
                    success: true,
                    user: editedLang,
                    message: "user language deleted"
                });
            }
        }
        catch (error) {
            next(errorResponse_1.default.badRequest(error.message));
        }
    });
};
exports.deleteLanguageController = deleteLanguageController;
