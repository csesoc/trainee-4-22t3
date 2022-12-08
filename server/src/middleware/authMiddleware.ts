import { Request, Response } from 'express';
import User from '../models/userModel';
import jwt from 'jsonwebtoken';

function authenticateToken(req: Request, res: Response, next: any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // console.log(token);

  if (token == null) {
    res.status(401).json({ error: 'No token' });
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ error: 'Invalid token' });
        return;
      }

      const user = await User.findById(decoded.id);
      if (!user) {
        res.status(400).json({ error: 'Invalid id' });
        return;
      }
      req.user = user;

      next();
    }
  );
}

export { authenticateToken };
