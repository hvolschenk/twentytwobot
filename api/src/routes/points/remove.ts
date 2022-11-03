import { RequestHandler } from 'express';

import dbPointsRemove from '../../database/points/remove';
import logger from '../../shared/logger';
import { Points } from '../../types/Points';
import { User } from '../../types/User';

interface RequestBody {
  points: Points['points'];
  username: User['username'];
}

const pointsRemove: RequestHandler<void, void, RequestBody> = async (
  request,
  response,
  next
) => {
  const { points, username } = request.body;
  try {
    dbPointsRemove({ points, username });
    response.sendStatus(204);
  } catch (error) {
    logger.error(
      { err: error, points, username },
      'Could not remove points from user'
    );
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default pointsRemove;
