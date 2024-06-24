import mongoose, { Schema } from 'mongoose';
import { IAdmin } from '../../../../domain/entities/admin.entity';


const AdminSchema: Schema = new Schema({
  password: { type: String },
  email: { type: String },
  name: { type: String },
  access: { type: String, enum: [ 'can-view', 'can-edit' ] },
  role: { type: String ,default:'sub-admin'},
  blocked: { type: Boolean ,default:false},
  createdAt: { type : Date, default: Date.now },
});

const Admin = mongoose.model<IAdmin>('Admin', AdminSchema);

export default Admin;

