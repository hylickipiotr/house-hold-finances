import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import cors from 'cors';
import morgan from 'morgan';
import TransactionsController from './controllers/TransactionsController';
import Prisma from './database/prisma';
import validateJwt from './helpers/jwtValidator';
import ErrorMiddleware from './middlewares/ErrorHandler';

dotenv.config();

const app = express();

Container.set({
  id: 'prisma',
  global: true,
  value: Prisma.getClient(),
});

app.use(cors());
app.use(morgan('dev'));
useContainer(Container);

useExpressServer(app, {
  defaultErrorHandler: false,
  middlewares: [ErrorMiddleware],
  controllers: [TransactionsController],
  async currentUserChecker(action) {
    if (process.env.NODE_ENV === 'development') {
      const currentUser = process.env.CURRENT_USER;
      if (currentUser) {
        return { sub: currentUser };
      }
    }

    try {
      return await validateJwt(action.request.headers.authorization);
    } catch (err) {
      return null;
    }
  },
  async authorizationChecker(action) {
    if (process.env.NODE_ENV === 'development') {
      const currentUser = process.env.CURRENT_USER;
      if (currentUser) {
        return true;
      }
    }

    try {
      const decodedJwt = await validateJwt(
        action.request.headers.authorization
      );
      return !!decodedJwt;
    } catch (err) {
      return false;
    }
  },
});

export default app;
