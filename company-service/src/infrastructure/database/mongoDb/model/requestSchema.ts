import mongoose, { Schema } from "mongoose";
import { IRequests } from "../../../../domain/entities";

const RequestsSchema: Schema = new Schema({
    approval: { type: String, enum: ['approved', 'inProgress', 'rejected'] },
    status: { type: String, enum: [ 'firstAttempt','secondAttempt','completed'] },
    companyname: { type: String },
    email: { type: String },
    address: { type: String },
    document: { type: String },
    password:{ type: String },
    createdAt: { type : Date, default: Date.now },
});

const Requests = mongoose.model<IRequests>('Requests', RequestsSchema);

export default Requests;