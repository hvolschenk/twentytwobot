import { RequestHandler } from 'express';

import dbTimerCreate from '../../database/timer/create';
import logger from '../../shared/logger';
import { Timer } from '../../types/Timer';

type RequestBody = Pick<Timer, 'intervalSeconds' | 'name'>;

const timerCreate: RequestHandler<void, void, RequestBody> = async (
  request,
  response,
  next
) => {
  const { intervalSeconds, name } = request.body;
  try {
    await dbTimerCreate({ intervalSeconds, name });
    response.sendStatus(204);
  } catch (error) {
    logger.error({ err: error }, 'Failed to create timer');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default timerCreate;
