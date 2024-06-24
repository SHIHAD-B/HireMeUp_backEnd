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
exports.editScheduleController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const scheduleValidation_1 = require("../../utils/validation/scheduleValidation");
const editScheduleController = (dependencies) => {
    const { useCases: { editScheduleUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const eData = req.body;
            delete eData.deleted;
            delete eData.__v;
            delete eData.createdAt;
            delete eData.expires;
            const { value, error } = scheduleValidation_1.scheduleValidation.validate(req.body);
            if (error) {
                return next(errorResponse_1.default.conflict(String(error)));
            }
            else {
                const schedule = yield editScheduleUseCase(dependencies).execute(value);
                if (!schedule) {
                    return next(errorResponse_1.default.conflict("failed to edit schedule"));
                }
                else {
                    return res.status(200).json({
                        success: true,
                        user: schedule,
                        message: "schedule edited successfully..."
                    });
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.editScheduleController = editScheduleController;
