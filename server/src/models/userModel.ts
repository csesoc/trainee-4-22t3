import { Schema, model } from 'mongoose';
import { PopulatedDoc } from 'mongoose';
import { IMusic } from './musicModel';

interface IUser {
  email: string;
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  email: String,
  username: String,
  password: String,
});

export default model('User', userSchema);
