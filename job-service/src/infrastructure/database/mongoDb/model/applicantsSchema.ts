import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { IApplicants } from '../../../../domain/entities';

const ApplicantsSchema: Schema = new Schema({
  jobId: { type: Schema.Types.ObjectId },
  schedule: [{
     date: { type: Date },
     feedback: { type: String },
     status: { type: String, enum: [ 're-scheduled', 'completed', 'upcomming', 'cnacelled' ] },
     time: { type: String },
     title: { type: String },
  }],
  userId: { type: Schema.Types.ObjectId },
  createdAt: { type: Date },
  hiring_status: { type: String, enum: [ 'in-review', 'shortlisted', 'interview', 'hired', 'declined' ] },
  resume: { type: String },
  hiring_info: [{
     date: { type: Date },
     interviewer: { type: String },
     notes: { type: String },
     status: { type: String, enum: [ ] },
  }],
});

const Applicants = mongoose.model<IApplicants>('Applicants', ApplicantsSchema);

export default Applicants;

