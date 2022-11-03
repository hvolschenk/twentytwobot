import { RequestHandler } from 'express';

import dbTimerGetAll from '../../database/timer/getAll';
import logger from '../../shared/logger';
import { Timer } from '../../types/Timer';

const timerGetAll: RequestHandler<void, Timer[]> = async (
  request,
  response,
  next
) => {
  try {
    const timers = await dbTimerGetAll();
    response.send(timers);
  } catch (error) {
    logger.error({ err: error }, 'Failed to get all timers');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default timerGetAll;
