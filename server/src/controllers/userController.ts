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

function authenticateToken(req: Request, res: Response, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, uId: any) => {
      if (err) return res.sendStatus(403).json(err);
      const user = await User.findById(uId.id);
      console.log(user);
      if (user) {
        Object.assign(req, { user });
      } else {
        res.sendStatus(400).json({ error: 'User not found' });
      }
      next();
    }
  );
}

export { registerUser, loginUser, authenticateToken };
