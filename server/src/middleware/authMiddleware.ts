import { Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

function authenticateToken(req: Request, res: Response, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    res.status(401).json({ error: 'No token' });
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) return res.sendStatus(403).json(err);
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
        // Object.assign(req, { user });
      } else {
        res.sendStatus(400).json({ error: 'User not found' });
      }
      next();
    }
  );
}

export { authenticateToken };
