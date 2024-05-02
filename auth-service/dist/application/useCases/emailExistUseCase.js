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
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailExistUseCase = void 0;
const emailExistUseCase = (dependencies) => {
    const { repositories: { emailExist } } = dependencies;
    return {
        execute: (email) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield emailExist(email);
            }
            catch (error) {
                throw new Error(error);
            }
        })
    };
};
exports.emailExistUseCase = emailExistUseCase;
