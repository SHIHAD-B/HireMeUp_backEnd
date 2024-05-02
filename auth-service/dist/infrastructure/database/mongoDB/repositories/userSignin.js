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
exports.userSignin = void 0;
const client_1 = __importDefault(require("../../../rabbitmq/client"));
const bcrypt_1 = require("bcrypt");
const userSignin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let result = null;
        const client = yield client_1.default.getInstance();
        const rawResult = yield client.produce(data, "userSignin", "toUser");
        if (typeof rawResult === 'object' && rawResult !== null) {
            result = rawResult;
            let isMatch = false;
            if ('password' in result) {
                isMatch = yield (0, bcrypt_1.compare)(data.password, result.password);
                return isMatch ? result : false;
            }
            else {
                return null;
            }
        }
        return null;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.userSignin = userSignin;
