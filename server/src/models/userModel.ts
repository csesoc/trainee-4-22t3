import { Schema, model } from 'mongoose';
import { PopulatedDoc } from 'mongoose';
import { IUser } from './interfaces';

const userSchema = new Schema<IUser>({
  email: String,
  username: String,
  password: String,
});

export default model('User', userSchema);
