"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../../presentation/controller");
// import { userAuthMiddleware } from "../../utils/middlewares/userAuth";
// import { adminAuthMiddleware } from "../../utils/middlewares/adminAuth";
const userRoutes = (dependencies) => {
    const { createRoom, getMessage, getRoom, sendMessage, listAllMessage } = (0, controller_1.controller)(dependencies);
    const router = (0, express_1.Router)();
    router.route('/sendmessge').post(sendMessage);
    router.route('/getmessage').get(getMessage);
    router.route('/getroom').get(getRoom);
    router.route('/createroom').post(createRoom);
    router.route('/listmessages').get(listAllMessage);
    return router;
};
exports.userRoutes = userRoutes;
