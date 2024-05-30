import mongoose, { Schema } from "mongoose";
import { IEmployee } from "../../../../domain/entities";

const EmployeeSchema: Schema = new Schema({
    companyId: { type: Schema.Types.ObjectId },
    firstName: { type: String, required: true },
    profile: { type: String },
    lastName: { type: String, required: true },
    email: { type: String, required: true},
    position: { type: String, required: true },
    department: { type: String, required: true },
    isActive: { type: Boolean,default:true },
    deleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now() }

});

const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);

export default Employee;
