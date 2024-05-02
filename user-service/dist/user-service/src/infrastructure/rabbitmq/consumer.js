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
class Consumer {
    constructor(channel, messageQueue) {
        this.channel = channel;
        this.messageQueue = messageQueue;
    }
    consumeMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("ready to consume messages");
            this.channel.consume(this.messageQueue, (message) => {
                const { correlationId, replyTo } = message === null || message === void 0 ? void 0 : message.properties;
                if (!correlationId || !replyTo) {
                    throw new Error("required fields is missing , correlationId | replyTo");
                }
                else {
                }
                console.log("the reply is ...", message === null || message === void 0 ? void 0 : message.content.toString());
            });
        });
    }
}
exports.default = Consumer;
