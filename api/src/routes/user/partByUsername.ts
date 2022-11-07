import { RequestHandler } from 'express';

import userLogPart from '../../database/userLog/part';
import logger from '../../shared/logger';

interface RequestParameters {
  username: string;
}

const userPartByUsername: RequestHandler<RequestParameters> = async (
  request,
  response,
  next
) => {
  const { username } = request.params;
  try {
    await userLogPart({ username });
    response.sendStatus(204);
  } catch (error) {
    logger.error({ err: error, username }, 'Failed to log the user parting');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default userPartByUsername;
