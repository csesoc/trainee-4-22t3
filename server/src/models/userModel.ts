import { Schema, model } from 'mongoose';
import { IUser } from './interfaces';

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid email address',
    ],
  },
  username: {
    type: String,
    minLength: [3, 'Username must be at least 3 characters long'],
    maxLength: [25, 'Username cannot be over 25 characters long'],
  },
  password: {
    type: String,
  },
  profileImgUrl: {
    type: String,
    default: 'https://i.stack.imgur.com/l60Hf.png',
  },
});

export default model('User', userSchema);
