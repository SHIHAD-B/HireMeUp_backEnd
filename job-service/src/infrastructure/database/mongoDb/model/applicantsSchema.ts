import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { IApplicants } from '../../../../domain/entities';

const ApplicantsSchema: Schema = new Schema({
   companyId: { type: Schema.Types.ObjectId },
   jobId: { type: Schema.Types.ObjectId },
   deleted: { type: Boolean, default: false },
   schedule: [{
      date: { type: Date },
      feedback: { type: String },
      status: { type: String, enum: ['re-scheduled', 'completed', 'upcomming', 'cancelled'] },
      time: { type: String },
      title: { type: String },
   }],
   userId: { type: Schema.Types.ObjectId },
   createdAt: { type: Date, default: Date.now },
   hiring_status: { type: String, enum: ['in-review', 'shortlisted', 'interview', 'hired', 'rejected'],default:'in-review' },
   resume: { type: String },
   answers: { type: Array },
   hiring_info: [{
      date: { type: Date },
      interviewer: { type: String },
      notes: { type: String },
      status: { type: String, enum: [] },
   }],
});

const Applicants = mongoose.model<IApplicants>('Applicants', ApplicantsSchema);

export default Applicants;

