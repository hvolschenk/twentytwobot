import { ErrorRequestHandler } from 'express';

import logger from '../logger';

const middlewareError: ErrorRequestHandler = (
  error,
  request,
  response,
  next
) => {
  logger.error({ err: error }, 'A generic error occurred');
  response.sendStatus(500);
  next();
};

export default middlewareError;
