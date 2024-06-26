"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    return res.status(err.status).json({
        success: false,
        status: err.status,
        message: err.message
    });
};
exports.errorHandler = errorHandler;
