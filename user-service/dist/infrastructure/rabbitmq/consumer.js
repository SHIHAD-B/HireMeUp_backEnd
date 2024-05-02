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
const messageHandler_1 = __importDefault(require("./messageHandler"));
class Consumer {
    constructor(channel, rpcQueue) {
        this.channel = channel;
        this.rpcQueue = rpcQueue;
    }
    consumeMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Ready to consume messages...");
            this.channel.consume(this.rpcQueue, (message) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (message !== null) {
                    const { correlationId, replyTo } = (message === null || message === void 0 ? void 0 : message.properties) || {};
                    const operation = (_b = (_a = message === null || message === void 0 ? void 0 : message.properties) === null || _a === void 0 ? void 0 : _a.headers) === null || _b === void 0 ? void 0 : _b.function;
                    if (!correlationId || !replyTo) {
                        console.log("Missing some properties...");
                    }
                    const data = JSON.parse(message.content.toString());
                    yield messageHandler_1.default.handle(operation, data, correlationId, replyTo);
                }
            }), {
                noAck: true,
            });
        });
    }
}
exports.default = Consumer;
