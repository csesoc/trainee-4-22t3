import { Schema, model } from 'mongoose';
import { IItem } from './interfaces';

const itemSchema = new Schema<IItem>({
  uId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  category: {
    type: String,
    required: [true, 'Each item must belong to a category'],
  },
  name: {
    type: String,
    required: [true, 'Each item must have a name'],
  },
  comment: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Each item must have a rating'],
  },
  imageRef: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    default: 'https://apply.sts.net.pk/assets/images/default-upload-image.jpg',
  },
  extraFields: {
    type: Map,
    of: String,
    required: false,
  },
});

export default model('Item', itemSchema);
