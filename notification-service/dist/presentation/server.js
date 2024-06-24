"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("../config/envConfig/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = require("../utils/error/errorHandler");
const dependencies_1 = require("../config/dependencies");
const user_routes_1 = require("../infrastructure/routes/user.routes");
// import { adminRoutes } from "../infrastructure/routes/admin.routes";
const company_routes_1 = require("../infrastructure/routes/company.routes");
const app = (0, express_1.default)();
const PORTNUMBER = Number(config_1.PORT);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/user', (0, user_routes_1.userRoutes)(dependencies_1.dependencies));
app.use('/company', (0, company_routes_1.companyRoutes)(dependencies_1.dependencies));
// app.use('/admin', adminRoutes(dependencies))
app.use("*", (req, res, next) => {
    res.status(404).send("api not found : notification service");
});
app.use(errorHandler_1.errorHandler);
app.listen(config_1.PORT, () => {
    console.log(`connected to notification service at ${PORTNUMBER}`);
});
exports.default = app;
