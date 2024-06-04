"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config/envConfig/config");
exports.default = {
    rabbitMQ: {
        url: config_1.RABBITMQ_URL,
        queues: {
            authQueue: "authQueue",
            userQueue: "userQueue",
            companyQueue: "companyQueue",
            subscriptionQueue: "subscriptionQueue"
        },
    },
};
