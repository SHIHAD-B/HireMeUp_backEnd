"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/envConfig/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("../utils/error/errorHandler");
const user_routes_1 = require("../infrastructure/routes/user.routes");
const company_routes_1 = require("../infrastructure/routes/company.routes");
const dependencies_1 = require("../config/dependencies");
const http_1 = __importDefault(require("http"));
const socket_1 = __importDefault(require("../infrastructure/socket/socket"));
const app = (0, express_1.default)();
const PORTNUMBER = Number(config_1.PORT);
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/api/v1/chat/user', (0, user_routes_1.userRoutes)(dependencies_1.dependencies));
app.use('/api/v1/chat/company', (0, company_routes_1.companyRoutes)(dependencies_1.dependencies));
(0, socket_1.default)(server);
app.use("*", (req, res, next) => {
    res.status(404).send("api not found : chat service");
});
app.use(errorHandler_1.errorHandler);
server.listen(config_1.PORT, () => {
    console.log(`connected to chat service at ${PORTNUMBER}`);
});
exports.default = app;
