import { IJobs } from "../../../../domain/entities";
import mongoose, { Schema} from 'mongoose';


const JobsSchema: Schema = new Schema({
  companyId: { type: Schema.Types.ObjectId },
  description: { type: String },
  salary_from: { type: Number },
  responsibilities: { type: String },
  required_skills: { type: String },
  requirements: { type: String },
  category: { type: Schema.Types.ObjectId },
  salary_to: { type: String },
  job_title: { type: String },
  type: { type: String, enum: [ 'full-time', 'part-time', 'remote', 'internship' ] },
  benifts: [{
     description: { type: String },
     icon: { type: String },
     name: { type: String },
  }],
  qualification: { type: String },
  slot: { type: Number },
  start_date: { type: Date },
  end_date: { type: Date },
  level: { type: String, enum: [ 'entry', 'mid', 'director', 'vp or above' ] },
});

const Jobs = mongoose.model<IJobs>('Jobs', JobsSchema);

export default Jobs;

