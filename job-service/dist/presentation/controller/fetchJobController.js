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
exports.fetchJobController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
const fetchJobController = (dependencies) => {
    const { useCases: { fetchJobsUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            console.log(typeof id);
            function isValidObjectId(id) {
                const objectIdPattern = /^[0-9a-fA-F]{24}$/;
                return objectIdPattern.test(id);
            }
            if (!isValidObjectId(id)) {
                return next(errorResponse_1.default.badRequest("invalid company id..."));
            }
            const job = yield fetchJobsUseCase(dependencies).execute(id);
            if (!job) {
                console.log("else not job");
                return next(errorResponse_1.default.badRequest("failed to fetch job.."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: job,
                    message: "job fetched successfully..."
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.fetchJobController = fetchJobController;
