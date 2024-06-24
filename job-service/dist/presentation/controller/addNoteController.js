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
exports.addNoteController = void 0;
const errorResponse_1 = __importDefault(require("../../utils/error/errorResponse"));
/**
 * addNoteController - Controller function to handle adding notes using the addNoteUseCase.
 *
 * This controller:
 * 1. Destructures the 'id', 'employee', and 'notes' from the request body.
 *    - If any of these fields are missing, returns a null response.
 * 2. Executes the addNoteUseCase to add the note based on the request body.
 *    - If adding the note fails, returns a bad request error.
 * 3. Returns a success response with the added note data if successful.
 * 4. Passes any errors encountered during the process to the error handling middleware.
 */
const addNoteController = (dependencies) => {
    const { useCases: { addNoteUseCase } } = dependencies;
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id, employee, notes } = req.body;
            if (!id || !employee || !notes) {
                return null;
            }
            const addnotes = yield addNoteUseCase(dependencies).execute(req.body);
            if (!addnotes) {
                return next(errorResponse_1.default.badRequest("failed to add note.."));
            }
            else {
                return res.status(200).json({
                    success: true,
                    user: addnotes,
                    message: "note added successfully..."
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
};
exports.addNoteController = addNoteController;
