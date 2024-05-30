import { string } from "joi";
import { IJobs } from "../../../../domain/entities";
import mongoose, { Schema } from 'mongoose';


const JobsSchema: Schema = new Schema({
  companyId: { type: Schema.Types.ObjectId },
  description: { type: String },
  deleted: { type: Boolean, default: false },
  salary_from: { type: Number },
  responsibilities: { type: String },
  required_skills: { type: [String] },
  requirements: { type: String },
  category: { type: Schema.Types.ObjectId },
  salary_to: { type: Number },
  job_title: { type: String },
  type: { type: String, enum: ['Full-Time','Part-Time', 'Remote', 'Internship', 'Contract'] },
  benefits: [{
    description: { type: String },
    icon: { type: Number },
    name: { type: String },
  }],
  qualification: { type: String },
  slot: { type: Number },
  start_date: { type: Date },
  end_date: { type: Date },
  level: { type: String, enum: ['entry', 'mid', 'director','senior', 'vp or above'] },
  createdAt: { type: Date, default: Date.now },
  expires: {
    type: Date, default: function () {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 30);
      return currentDate;
    }
  }
});

const Jobs = mongoose.model<IJobs>('Jobs', JobsSchema);

export default Jobs;

