import mongoose, { Schema } from 'mongoose';
import { ISubscriptions } from '../../../../domain/entities';

const SubscriptionsSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  planId: { type: Schema.Types.ObjectId },
  end_date: { type: Date },
  paymentId: { type: String },
  start_date: { type: Date},
  createdAt: { type: Date},
  status: { type: String, enum: ['active', 'expired', 'expire-soon'] },
});

const Subscriptions = mongoose.model<ISubscriptions>('Subscriptions', SubscriptionsSchema);

export default Subscriptions;

