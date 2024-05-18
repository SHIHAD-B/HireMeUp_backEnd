import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../../../../domain/entities';


const CategorySchema: Schema = new Schema({
  description: { type: String },
  category: { type: String },
  deleted: { type: Boolean , default: false },
  createdAt: { type : Date, default: Date.now },
  editedAt: { type : Date, default: Date.now },
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;

