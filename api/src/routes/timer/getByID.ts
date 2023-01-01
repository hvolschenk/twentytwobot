import { RequestHandler } from 'express';

import dbTimerGetByID from '../../database/timer/getByID';
import timerMessageGetByTimerID from '../../database/timerMessage/getByTimerID';
import logger from '../../shared/logger';
import { TimerWithMessages } from '../../types/TimerWithMessages';

interface RequestParams {
  timerID: string;
}

const timerGetByID: RequestHandler<RequestParams, TimerWithMessages> = async (
  request,
  response,
  next
) => {
  const { timerID } = request.params;
  try {
    const id = parseInt(timerID, 10);
    const timer = await dbTimerGetByID({ id });
    if (!timer) {
      response.sendStatus(404);
    } else {
      const timerMessages = await timerMessageGetByTimerID({ timerID: id });
      response.send({ ...timer, messages: timerMessages });
    }
  } catch (error) {
    logger.error({ err: error, timerID }, 'Failed to get timer');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default timerGetByID;
