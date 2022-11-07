import { RequestHandler } from 'express';

const middleware404: RequestHandler = (request, response, next) => {
  if (!request.route) {
    response.sendStatus(404);
  }
  next();
};

export default middleware404;
