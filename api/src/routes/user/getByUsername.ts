import { RequestHandler } from 'express';

import dbUserGetByUsername from '../../database/user/getByUsername';
import logger from '../../shared/logger';
import { User } from '../../types/User';

interface RequestParameters {
  username: string;
}

const userGetByUsername: RequestHandler<RequestParameters, User> = async (
  request,
  response,
  next
) => {
  const { username } = request.params;
  try {
    const user = await dbUserGetByUsername({ username });
    if (!user) {
      response.sendStatus(404);
    } else {
      response.send(user);
    }
  } catch (error) {
    logger.error({ err: error, username }, 'Failed to get user by username');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default userGetByUsername;
