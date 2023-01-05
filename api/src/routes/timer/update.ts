import { RequestHandler } from 'express';

import dbTimerUpdate from '../../database/timer/update';
import logger from '../../shared/logger';
import { Timer } from '../../types/Timer';

type RequestBody = Pick<Timer, 'intervalSeconds' | 'name'>;

interface RequestParams {
  timerID: string;
}

const timerUpdate: RequestHandler<RequestParams, void, RequestBody> = async (
  request,
  response,
  next
) => {
  const { timerID } = request.params;
  const { intervalSeconds, name } = request.body;
  try {
    const id = parseInt(timerID, 10);
    await dbTimerUpdate({ id, intervalSeconds, name });
    response.sendStatus(204);
  } catch (error) {
    logger.error({ err: error, timerID }, 'Failed to update timer');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default timerUpdate;
