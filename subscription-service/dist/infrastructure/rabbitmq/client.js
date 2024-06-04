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
const amqplib_1 = require("amqplib");
const rabbitmq_config_1 = __importDefault(require("./rabbitmq.config"));
const consumer_1 = __importDefault(require("./consumer"));
const producer_1 = __importDefault(require("./producer"));
const events_1 = require("events");
class RabbitMQClient {
    constructor() {
        this.isInitialized = false;
        this.eventEmitter = new events_1.EventEmitter();
        this.userQueue = rabbitmq_config_1.default.rabbitMQ.queues.userQueue;
    }
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                this.instance = new RabbitMQClient();
                yield this.instance.initialize();
            }
            return this.instance;
        });
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isInitialized) {
                return;
            }
            try {
                this.connection = yield (0, amqplib_1.connect)(rabbitmq_config_1.default.rabbitMQ.url);
                this.producerChannel = yield this.connection.createChannel();
                this.consumerChannel = yield this.connection.createChannel();
                const { queue: replyQueueName } = yield this.consumerChannel.assertQueue("", { exclusive: true });
                this.producer = new producer_1.default(this.producerChannel, replyQueueName, this.eventEmitter);
                this.consumer = new consumer_1.default(this.consumerChannel, replyQueueName, this.eventEmitter);
                this.consumer.consumeMessages();
                this.isInitialized = true;
            }
            catch (error) {
                console.error("rabbitmq initialization error:", error);
                throw new Error("Failed to initialize RabbitMQ client.");
            }
        });
    }
    produce(data, operation, to) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let toQueue = "";
            switch (to) {
                case "toUser":
                    toQueue = this.userQueue;
                    break;
                default:
                    console.log("Unknown operation:", operation);
                    break;
            }
            if (!this.isInitialized) {
                yield this.initialize();
            }
            return (_a = this.producer) === null || _a === void 0 ? void 0 : _a.produceMessages(data, operation, toQueue);
        });
    }
}
RabbitMQClient.instance = null;
exports.default = RabbitMQClient;
