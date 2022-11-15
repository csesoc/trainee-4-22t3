import User from '../models/userModel.js';

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.create({
    username,
    email,
    password,
  });
  uId = user._id;
  res.json({ uId });
};
const loginUser = (req, res) => {
  const { username, email, password } = req.body;
};

export { registerUser, loginUser };
