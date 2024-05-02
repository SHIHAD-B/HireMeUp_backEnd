import mongoose, { Schema } from "mongoose";
import { ICompany } from "../../../../domain/entities";

const CompanySchema: Schema = new Schema({
    email: { type: String },
    password: { type: String },
    website: { type: String },
    description: { type: String },
    status: { type: String, enum: ['active', 'blocked'] },
    tech_stack: [{ type: String, }],
    images: [{ type: String, }],
    titile: { type: String },
    approval: { type: String, enum: ['approved', 'rejected'] },
    noOfEmployees: { type: Number },
    contact: {
    },
    industry: { type: String },
    benefits: [{
    }],
    icon: { type: String },
    location: [{ type: String, }],
    founded: { type: Date },
    company_name: { type: String },
    createdAt: { type : Date, default: Date.now },
});

const Company = mongoose.model<ICompany>('Company', CompanySchema);

export default Company;
