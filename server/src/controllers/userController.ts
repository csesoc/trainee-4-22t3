import { Request, Response } from 'express';
import User from '../models/userModel';
import { User as UserType } from '../models/interfaces';
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
  
  const userMatches = await User.find({ username: username});
  if (username.length < 3 || username.length > 25) {
    res.status(400).json({ error: 'Username must be between 3 and 25 characters long, inclusive.' });
    return;
  } else if (/^[a-zA-Z0-9!@\$\^\&*\)\(._-]+$/g.test(username) !== true) {
    res.status(400).json({ error: 'Username contains an invalid character.' });
    return;
  } else if (userMatches.length !== 0) {
    res.status(400).json({ error: 'Username is already taken.' });
    return;
  }
  
  if (password.length < 3) {
    res.status(400).json({ error: 'Password must be at least 3 characters long.' });
    return;
  }
  if (username)

  try {
    const user = await User.create({
      username,
      email,
      password: passwordHash,
      profileImgUrl,
    });
    User.create

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
    res.status(400).json({ error: 'Could not login.' });
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

const updateUser = async (req: Request, res: Response) => {
  const { username, profileImgUrl } = req.body;
  const user = req.user as UserType;
  
  const userMatches = await User.find({ username: username});
  if (username.length < 3 || username.length > 25) {
    res.status(400).json({ error: 'Username must be between 3 and 25 characters long, inclusive.' });
    return;
  } else if (/^[a-zA-Z0-9!@\$\^\&*\)\(._-]+$/g.test(username) !== true) {
    res.status(400).json({ error: 'Username contains an invalid character.' });
    return;
  } else if (userMatches.length !== 0 && username !== user.username) {
    res.status(400).json({ error: 'Username is already taken.' });
    return;
  }

  try {
    const userDoc = await User.findByIdAndUpdate(user._id, { username: username, profileImgUrl: profileImgUrl });
    if (userDoc) {
      res.status(200).json({ 
        username: userDoc.username, 
        profileImgUrl: userDoc.profileImgUrl 
      });
    } else {
      res.status(400).json({ error: 'Could not update user details.' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const detailsUser = async (req: Request, res: Response) => {
  const user = req.user as UserType;
  try {
    const userDoc = await User.findById(user._id);
    if (userDoc) {
      res.status(200).json(userDoc);
    } else {
      res.status(400).json({ error: 'Could not get user details' });
    }
  } catch (err) {
    res.status(400).json(err);
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



export { registerUser, loginUser, searchUsers, updateUser, detailsUser };
