"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const addNotificationController_1 = require("./addNotificationController");
const fetchNotification_1 = require("./fetchNotification");
const updateReadStatusController_1 = require("./updateReadStatusController");
const controller = (dependencies) => {
    return {
        addNofitcation: (0, addNotificationController_1.addNotificationController)(dependencies),
        fetchNotification: (0, fetchNotification_1.fetchNotificationController)(dependencies),
        updateReadStatus: (0, updateReadStatusController_1.updateReadStatusController)(dependencies)
    };
};
exports.controller = controller;
