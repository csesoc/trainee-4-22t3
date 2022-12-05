import { Schema, model } from 'mongoose';
import { PopulatedDoc } from 'mongoose';
import { IUser } from './interfaces';

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  username: {
    type: String,
    minLength: [3, 'Username must be atleast 3 characters long'],
    maxLength: [25, 'Username cannot be over 25 characters long'],
  },
  password: {
    type: String,
    minLength: [3, 'Password must be atleast 3 characters long'],
  },
  profileImgUrl: {
    type: String,
    default: 'https://i.stack.imgur.com/l60Hf.png',
  },
});

export default model('User', userSchema);
