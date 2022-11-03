import { RequestHandler } from 'express';

import dbUserUpdate from '../../database/user/update';
import logger from '../../shared/logger';
import { User } from '../../types/User';

interface RequestBody {
  displayName: User['displayName'];
  lastGamePlayed: User['lastGamePlayed'];
  twitchID: User['twitchID'];
}

interface RequestParameters {
  id: string;
}

const userUpdate: RequestHandler<RequestParameters, void, RequestBody> = async (
  request,
  response,
  next
) => {
  const { displayName, lastGamePlayed, twitchID } = request.body;
  const { id } = request.params;
  try {
    await dbUserUpdate({
      displayName,
      id: parseInt(id, 10),
      lastGamePlayed,
      twitchID,
    });
    response.sendStatus(204);
  } catch (error) {
    logger.error({ err: error, id }, 'Failed to update the user');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default userUpdate;
