"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const createRoomController_1 = require("./createRoomController");
const getMessageController_1 = require("./getMessageController");
const getRoomController_1 = require("./getRoomController");
const sendMessageController_1 = require("./sendMessageController");
const listAllMessages_1 = require("./listAllMessages");
const controller = (dependencies) => {
    return {
        sendMessage: (0, sendMessageController_1.sendMessageController)(dependencies),
        getRoom: (0, getRoomController_1.getRoomController)(dependencies),
        getMessage: (0, getMessageController_1.getMessageController)(dependencies),
        createRoom: (0, createRoomController_1.createRoomController)(dependencies),
        listAllMessage: (0, listAllMessages_1.listAllMessageController)(dependencies)
    };
};
exports.controller = controller;
