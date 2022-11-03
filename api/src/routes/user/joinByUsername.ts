import { RequestHandler } from 'express';

import userLogJoin from '../../database/userLog/join';
import logger from '../../shared/logger';

interface RequestParameters {
  username: string;
}

const userJoinByUsername: RequestHandler<RequestParameters> = async (
  request,
  response,
  next
) => {
  const { username } = request.params;
  try {
    await userLogJoin({ username });
    response.sendStatus(204);
  } catch (error) {
    logger.error({ err: error, username }, 'Failed to log the user joining');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default userJoinByUsername;
