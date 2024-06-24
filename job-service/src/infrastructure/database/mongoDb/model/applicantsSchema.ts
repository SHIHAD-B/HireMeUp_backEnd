import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { IApplicants } from '../../../../domain/entities';

const ApplicantsSchema: Schema = new Schema({
   companyId: { type: Schema.Types.ObjectId },
   jobId: { type: Schema.Types.ObjectId },
   deleted: { type: Boolean, default: false },
   userId: { type: Schema.Types.ObjectId },
   createdAt: { type: Date, default: Date.now },
   hiring_status: { type: String, enum: ['in-review', 'shortlisted', 'interview', 'hired', 'rejected'],default:'in-review' },
   resume: { type: String },
   answers: { type: Array },
   hiring_info: [{
      name: { type: String },
      notes: { type: String },
   }],
});

const Applicants = mongoose.model<IApplicants>('Applicants', ApplicantsSchema);

export default Applicants;

