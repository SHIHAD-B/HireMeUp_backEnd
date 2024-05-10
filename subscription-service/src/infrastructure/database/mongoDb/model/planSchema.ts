import mongoose, { Schema } from 'mongoose';
import { IPlans } from '../../../../domain/entities/plan.entity';

const PlansSchema: Schema = new Schema({
  duration: { type: Number },
  description: { type: String },
  price: { type: Number },
  name: { type: String },
  editedAt: { type: Date, default: Date.now },
  discount: { type: Number },
  deleted: { type: Boolean },
  createdAt: { type: Date, default: Date.now },
});

const Plans = mongoose.model<IPlans>('Plans', PlansSchema);

export default Plans;

