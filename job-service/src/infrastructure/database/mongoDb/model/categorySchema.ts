import mongoose, { Schema } from 'mongoose';
import { ICategory } from '../../../../domain/entities';


const CategorySchema: Schema = new Schema({
  description: { type: String },
  category: { type: String },
  createdAt: { type: Date },
  editedAt: { type: Date },
});

const Category = mongoose.model<ICategory>('Category', CategorySchema);

export default Category;

