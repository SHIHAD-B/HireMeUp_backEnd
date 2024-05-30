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
exports.addJobController = void 0;
const addJobValidation_1 = require("../../utils/validation/addJobValidation");
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const addJobController = (dependencies) => {
    const { useCases: { addJobUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = Object.assign({}, req.body);
            delete data.createdAt;
            const { value, error } = addJobValidation_1.addJobValidation.validate(data);
            if (error) {
                return next(errorResponse_1.default.conflict(String(error)));
            }
            else {
                const job = yield addJobUseCase(dependencies).execute(value);
                if (!job) {
                    return next(errorResponse_1.default.badRequest("failed to add job.."));
                }
                else {
                    return res.status(200).json({
                        success: true,
                        user: job,
                        message: "job added successfully..."
                    });
                }
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.addJobController = addJobController;
