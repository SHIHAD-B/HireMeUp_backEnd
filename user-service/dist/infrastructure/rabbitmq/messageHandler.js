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
const client_1 = __importDefault(require("./client"));
const repositories_1 = require("../database/mongoDb/repositories");
class MessageHandler {
    static handle(operation, data, correlationId, replyTo) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = "success";
            switch (operation) {
                case "addUser":
                    response = yield (0, repositories_1.addUser)(data);
                    break;
                case "checkEmail":
                    response = yield (0, repositories_1.fetchUser)(data.email);
                    break;
                case "checkOtp":
                    response = yield (0, repositories_1.checkOtp)(data.email, data.otp);
                    break;
                case "addOtp":
                    response = yield (0, repositories_1.addOtp)(data.email, data.otp);
                    break;
                case "userSignin":
                    response = yield (0, repositories_1.fetchUser)(data.email);
                    break;
                default:
                    response = { success: false, error: "Unknown operation" };
                    console.log("Unknown operation:", operation);
                    break;
            }
            const rabbitMQClient = client_1.default.getInstance();
            yield rabbitMQClient.produce(response, correlationId, replyTo);
        });
    }
}
exports.default = MessageHandler;
