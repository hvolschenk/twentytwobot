import { RequestHandler } from 'express';

import dbTimerDelete from '../../database/timer/delete';
import timerMessageDeleteByTimerID from '../../database/timerMessage/deleteByTimerID';
import logger from '../../shared/logger';

interface RequestParameters {
  timerID: string;
}

const timerDelete: RequestHandler<RequestParameters> = async (
  request,
  response,
  next
) => {
  const { timerID } = request.params;
  try {
    const id = parseInt(timerID, 10);
    await timerMessageDeleteByTimerID({ timerID: id });
    await dbTimerDelete({ id });
    response.sendStatus(204);
  } catch (error) {
    logger.error({ err: error, timerID }, 'Failed to delete timer');
    response.sendStatus(500);
  }
  next();
};

export default timerDelete;
