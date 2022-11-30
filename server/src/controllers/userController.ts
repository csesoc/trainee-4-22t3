import { Request, Response } from 'express';
import User from '../models/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { rejects } from 'assert';

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  const user = await User.create({
    username,
    email,
    password: passwordHash,
  });

  res.json({
    uId: user._id,
    username: user.username,
    email: user.email,
    password: user.password,
    token: generateToken(user._id.toString()),
  });
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      uId: user._id,
      username: user.username,
      email: user.email,
      password: user.password,
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(400).json({ error: 'bruh' });
  }
};

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  });
};

interface JwtPayload {
  id: string;
}

function fetchUserByToken(req: Request) {
  return new Promise((resolve, reject) => {
    if (req.header && req.header('token')) {
      let authorization = req.header('token') as string;
      let decoded;
      try {
        decoded = jwt.verify(
          authorization,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
      } catch (err) {
        reject('Token is invalid');
        return;
      }
      let uId = decoded.id;
      User.findOne({ uId })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject('sus');
        });
    } else {
      reject('No token found');
    }
  });
}

export { registerUser, loginUser, fetchUserByToken };
