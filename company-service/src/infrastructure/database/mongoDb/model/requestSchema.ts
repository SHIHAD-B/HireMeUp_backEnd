import mongoose, { Schema } from "mongoose";
import { IRequests } from "../../../../domain/entities";

const RequestsSchema: Schema = new Schema({
    approval: { type: String, enum: ['approved', 'inProgress', 'rejected'] },
    status: { type: String, enum: ['firstAttempt', 'secondAttempt', 'completed'] },
    companyname: { type: String },
    viewdocument: {
        registration: { type: Boolean, default: false },
        license: { type: Boolean, default: false },
        tin: { type: Boolean, default: false },
        financialStatements: { type: Boolean, default: false },
        references: { type: Boolean, default: false }
    },
    email: { type: String },
    address: { type: String },
    registration: { type: String },
    license: { type: String },
    tin: { type: String },
    financialStatements: { type: String },
    references: { type: String },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Requests = mongoose.model<IRequests>('Requests', RequestsSchema);

export default Requests;