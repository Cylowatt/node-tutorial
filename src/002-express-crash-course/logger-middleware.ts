import { RequestHandler } from 'express';

import moment from 'moment';

export const loggerMiddleware: RequestHandler = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
  next();
};
