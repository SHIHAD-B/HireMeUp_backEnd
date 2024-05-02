import mongoose, { Schema} from 'mongoose';
import { IOtp } from '../../../../domain/entities/otp.entity';



const OtpSchema: Schema = new Schema({
  email: { type: String },
  createdAt: { type : Date, default: Date.now },
  code: { type: String},
  expiresIn: { type: Date, expires: "1m",default: Date.now}
});

const Otp = mongoose.model<IOtp>('Otp', OtpSchema);

export default Otp;

