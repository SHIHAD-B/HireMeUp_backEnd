
import mongoose, { Schema} from 'mongoose';
import { IUsers } from '../../../../domain/entities/user.entity';


const UsersSchema: Schema = new Schema({
  phone: { type: Number },
  username: { type: String },
  gender: { type: String },
  password: { type: String },
  email: { type: String },
  dob: { type: Date },
  profile: { type: String },
  skills: [{ type: String,  }],
  education: {
     description: { type: String },
     from: { type: String },
     grade: { type: String },
     to: { type: String },
  },
  cv: { type: String },
  about: { type: String },
  experiences: {
     description: { type: String },
     designation: { type: String },
     from: { type: Date },
     location: { type: String },
     to: { type: Date },
  },
  contacts: {
     email: { type: String },
     instagram: { type: String },
     linkedin: { type: String },
     phone: { type: String },
     portfolio: { type: String },
     twitter: { type: String },
  },
  online_status: { type: String, enum: [ 'online', 'offline' ] },
  blocked: { type: Boolean },
  deleted: { type: Boolean },
  subscription: [{
     subscriptionId: { type: Schema.Types.ObjectId },
  }],
});

const Users = mongoose.model<IUsers>('Users', UsersSchema);

export default Users;

