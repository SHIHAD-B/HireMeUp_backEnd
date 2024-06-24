import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import { INotification } from '../../../../domain/entities';


const NotificationSchema: Schema = new Schema({
    recipient: { type: Schema.Types.ObjectId },
    message: { type: String },
    sender: { type: Schema.Types.ObjectId },
    type: { type: String, enum: ['info', 'warning', 'error', 'custom'] },
    read: { type: Boolean ,default:false},
    createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;

