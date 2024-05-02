import mongoose,{Schema} from "mongoose";
import { IComplaints } from "../../../../domain/entities";

const ComplaintsSchema: Schema = new Schema({
    Documents: { type: String },
    UserId: { type: Schema.Types.ObjectId },
    ComapanyId: { type: Schema.Types.ObjectId },
    Complaint: { type: String },
    createdAt: { type : Date, default: Date.now },
  });
  
  const Complaints = mongoose.model<IComplaints>('Complaints', ComplaintsSchema);
  
  export default Complaints;