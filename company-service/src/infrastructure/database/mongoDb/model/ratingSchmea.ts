import mongoose, { Schema } from "mongoose";
import { IRating } from "../../../../domain/entities";


const RatingSchema: Schema = new Schema({
    Rating: { type: Number },
    Experience: { type: String },
    CompanyId: { type: Schema.Types.ObjectId },
    UserId: { type: Schema.Types.ObjectId },
    createdAt: { type: Date, default: Date.now },
});

const Rating = mongoose.model<IRating>('Rating', RatingSchema);

export default Rating;
