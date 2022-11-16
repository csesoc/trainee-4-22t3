import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    username,
    email,
    password: passwordHash,
  });
  // TODO: Create a token (perhaps use JWT tokens)
  const token = 'epic token';

  res.json({
    uId: user._id,
    username: user.username,
    email: user.email,
    password: user.password,
    token: token,
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = 'epic token';
    res.json({
      uId: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      token: token,
    });
  } else {
    res.status(400).json({ error: 'bruh' });
  }
};

export { registerUser, loginUser };
