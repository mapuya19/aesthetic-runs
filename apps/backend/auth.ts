import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from './db/prisma';

interface DecodedToken {
  userId: string;
  userEmail: string;
}

declare module 'express' {
  interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
}

export default async function auth(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      response.status(401).json({
        error: new Error('No token provided!'),
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.userId },
      select: { id: true, email: true },
    });

    if (!user) {
      response.status(401).json({
        error: new Error('User not found!'),
      });
      return;
    }

    request.user = user;
    next();
  } catch {
    response.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
}
