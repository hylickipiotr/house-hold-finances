import { Request, Response } from 'express';
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from 'routing-controllers';
import { Service } from 'typedi';

@Service()
@Middleware({ type: 'after' })
export default class ErrorHandler implements ExpressErrorMiddlewareInterface {
  // eslint-disable-next-line class-methods-use-this
  public error(error: any, _: Request, res: Response): void {
    if (res.headersSent) {
      return;
    }
    res.status(error.httpCode || 500).json(error);
  }
}
