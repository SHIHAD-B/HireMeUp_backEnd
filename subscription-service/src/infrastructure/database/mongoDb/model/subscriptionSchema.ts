import mongoose, { Schema} from 'mongoose';
import { ISubscriptions } from '../../../../domain/entities';

const SubscriptionsSchema: Schema = new Schema({
  UserId: { type: Schema.Types.ObjectId },
  PlanId: { type: Schema.Types.ObjectId },
  End_date: { type: Date },
  Start_date: { type: Date },
  CreatedAt: { type: Date },
  Status: { type: String, enum: [ 'active', 'expired', 'expire-soon' ] },
});

const Subscriptions = mongoose.model<ISubscriptions>('Subscriptions', SubscriptionsSchema);

export default Subscriptions;

