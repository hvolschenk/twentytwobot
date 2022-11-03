import { RequestHandler } from 'express';
import logger from '../logger';

const middlewareResponse: RequestHandler = (request, response, next) => {
  logger.info({ response: { request, response } }, '[API: Response]');
  next();
};

export default middlewareResponse;
