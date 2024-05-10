"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/envConfig/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("../utils/error/errorHandler");
const subscription_routes_1 = require("../infrastructure/routes/subscription.routes");
const dependencies_1 = require("../config/dependencies");
const app = (0, express_1.default)();
const PORTNUMBER = Number(config_1.PORT);
console.log(config_1.PORT, "port number");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/', (0, subscription_routes_1.subscriptionRoutes)(dependencies_1.dependencies));
app.use("*", (req, res, next) => {
    res.status(404).send("api not found : subscription service");
});
app.use(errorHandler_1.errorHandler);
app.listen(config_1.PORT, () => {
    console.log(`connected to subscription service at ${PORTNUMBER}`);
});
exports.default = app;
