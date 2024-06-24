import mongoose, { Schema } from 'mongoose';
import { IRefreshToken } from '../../../../domain/entities';

const refreshTokenSchema: Schema<IRefreshToken> = new Schema({
    token: { type: String, required: true },
    coreId: { type: Schema.Types.ObjectId, required: true },
    expiryDate: { type: Date, required: true },
});


refreshTokenSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 }); 

const RefreshToken = mongoose.model<IRefreshToken>('RefreshToken', refreshTokenSchema);

export default RefreshToken;
export { IRefreshToken };
