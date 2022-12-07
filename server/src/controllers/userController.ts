import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @desc    Registers a new user, generating and returning a token
 * @routes  POST /users/register
 */
const registerUser = async (req: Request, res: Response) => {
  const { username, email, password, profileImgUrl } = req.body;
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  
  if (password.length < 3) {
    res.status(400).json({ error: 'Password must be at least 3 characters long.' });
    return;
  }

  try {
    const user = await User.create({
      username,
      email,
      password: passwordHash,
      profileImgUrl,
    });

    res.status(200).json({
      uId: user._id,
      username: user.username,
      email: user.email,
      profileImgUrl: user.profileImgUrl,
      token: generateToken(user._id.toString())
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

/**
 * @desc    Logs a user in, generating and returning a token
 * @routes  POST /users/login
 */
const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      uId: user._id,
      username: user.username,
      email: user.email,
      profileImgUrl: user.profileImgUrl,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(400).json({ error: 'bruh' });
  }
};

const searchUsers = async (req: Request, res: Response) => {
  const searchStr = req.query.searchStr as string;
  try {
    const userMatches = await User.find({username : new RegExp(searchStr, 'i')});
    const usernames = userMatches.map(user => user.username);
    res.status(200).json(usernames);
  } catch (err) {
    res.status(200).json([]);
  }
};

/**
 * @desc  Generate a JWT token encoding the user ID
 */
const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

export { registerUser, loginUser, searchUsers };
