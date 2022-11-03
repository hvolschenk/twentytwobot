import { RequestHandler } from 'express';

import dbTimerMessageGetRandomByTimerID from '../../database/timerMessage/getRandomByTimerID';
import logger from '../../shared/logger';
import { TimerMessage } from '../../types/TimerMessage';

interface RequestParameters {
  timerID: string;
}

const timerMessageGetRandomByTimerID: RequestHandler<
  RequestParameters,
  TimerMessage
> = async (request, response, next) => {
  const { timerID } = request.params;
  try {
    const timerMessage = await dbTimerMessageGetRandomByTimerID({
      timerID: parseInt(timerID, 10),
    });
    if (!timerMessage) {
      response.sendStatus(404);
    } else {
      response.send(timerMessage);
    }
  } catch (error) {
    logger.error(
      { err: error, timerID },
      'Failed to get random timer message by timer ID'
    );
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default timerMessageGetRandomByTimerID;
