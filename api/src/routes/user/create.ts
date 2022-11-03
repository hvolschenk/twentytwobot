import { RequestHandler } from 'express';

import dbUserCreate from '../../database/user/create';
import logger from '../../shared/logger';
import { User } from '../../types/User';

type RequestBody = Pick<
  User,
  'displayName' | 'isBot' | 'lastGamePlayed' | 'twitchID' | 'username'
>;

const userCreate: RequestHandler<void, void, RequestBody> = async (
  request,
  response,
  next
) => {
  const { displayName, isBot, lastGamePlayed, twitchID, username } =
    request.body;
  try {
    await dbUserCreate({
      displayName,
      isBot,
      lastGamePlayed,
      twitchID,
      username,
    });
    response.sendStatus(204);
  } catch (error) {
    logger.error({ err: error }, 'Failed to create user');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default userCreate;
