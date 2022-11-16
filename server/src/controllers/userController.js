import User from '../models/userModel.js';

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  // TODO: Hash password (maybe using bcrypt)
  const user = await User.create({
    username,
    email,
    password,
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
  if (user && password === user.password) {
    const token = 'epic';
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
