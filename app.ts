import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import morgan from 'morgan';

import dbConnect from './db/dbConnect';
import prisma from './db/prisma';

const app = express();

dbConnect();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.get('/', (request: Request, response: Response) => {
  response.json({ message: 'Hey! This is your server response!' });
});

interface RegistrationRequestBody {
  email: string;
  password: string;
}

app.post(
  '/registration',
  async (
    request: Request<object, object, RegistrationRequestBody>,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        return response.status(400).send({
          message: 'Email and password are required',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      response.status(201).send({
        message: 'User created successfully',
        result: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
        },
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        return response.status(400).send({
          message: 'Email already exists',
        });
      }
      next(error);
    }
  },
);

interface LoginRequestBody {
  email: string;
  password: string;
}

app.post(
  '/login',
  async (
    request: Request<object, object, LoginRequestBody>,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, password } = request.body;

      if (!email || !password) {
        return response.status(400).send({
          message: 'Email and password are required',
        });
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return response.status(404).send({
          message: 'Email not found, please try again.',
        });
      }

      const passwordCheck = await bcrypt.compare(password, user.password);

      if (!passwordCheck) {
        return response.status(400).send({
          message: 'Incorrect password, please try again.',
        });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          userEmail: user.email,
        },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' },
      );

      response.status(200).send({
        message: 'Login successful!',
        email: user.email,
        token,
      });
    } catch (error) {
      next(error);
    }
  },
);

app.use((request: Request, response: Response) => {
  response.status(404).json({ message: 'Route not found' });
});

app.use((error: any, request: Request, response: Response) => {
  console.error(error.stack);
  response.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error : {},
  });
});

export default app;
