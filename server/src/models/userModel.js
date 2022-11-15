import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
});

export default mongoose.model(userSchema);
