import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import TransactionsController from './controllers/TransactionsController';
import Prisma from './database/prisma';
import authorizationChecker from './utils/auth/auth-checker';
import currentUserChecker from './utils/auth/user-checker';
import ErrorMiddleware from './middlewares/ErrorHandler';
import StatsController from './controllers/StatsController';
import ImportController from './controllers/ImportController';
import UserController from './controllers/UserController';

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
  controllers: [
    TransactionsController,
    StatsController,
    ImportController,
    UserController,
  ],
  currentUserChecker,
  authorizationChecker,
});

export default app;
