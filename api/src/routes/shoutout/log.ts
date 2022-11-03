import { RequestHandler } from 'express';

import shoutoutLogAdd from '../../database/shoutoutLog/add';
import logger from '../../shared/logger';
import { User } from '../../types/User';

interface RequestBody {
  usernameFrom: User['username'];
  usernameTo: User['username'];
}

const shoutoutLog: RequestHandler<void, void, RequestBody> = async (
  request,
  response,
  next
) => {
  const { usernameFrom, usernameTo } = request.body;
  try {
    await shoutoutLogAdd({ usernameFrom, usernameTo });
    response.sendStatus(204);
  } catch (error) {
    logger.error(
      { err: error, usernameFrom, usernameTo },
      'Failed to log the shoutout'
    );
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default shoutoutLog;
