import { Schema, model } from 'mongoose';
import { IItem } from './interfaces';

const itemSchema = new Schema<IItem>({
  uId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  released: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  extraFields: {
    type: Map,
    of: String,
    required: false,
  },
});

export default model('Item', itemSchema);
