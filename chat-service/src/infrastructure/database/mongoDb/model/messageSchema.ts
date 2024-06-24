import mongoose, { Schema } from 'mongoose';
import { IMessage } from '../../../../domain/entities';

const MessageSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId },
  receiver: { type: Schema.Types.ObjectId },
  content: { type: String },
  type: { type: String, enum: ['text', 'image', 'video', 'file'] },
  status: { type: String, enum: ['sent', 'delivered', 'read'],default:"sent" },
  createdAt: { type: String, default: Date.now },
});

const Message = mongoose.model<IMessage>('Message', MessageSchema);

export default Message;

