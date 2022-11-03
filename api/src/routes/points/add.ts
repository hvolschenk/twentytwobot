import { RequestHandler } from 'express';

import dbPointsAdd from '../../database/points/add';
import logger from '../../shared/logger';
import { Points } from '../../types/Points';
import { User } from '../../types/User';

interface RequestBody {
  points: Points['points'];
  username: User['username'];
}

const pointsAdd: RequestHandler<void, void, RequestBody> = async (
  request,
  response,
  next
) => {
  const { points, username } = request.body;
  try {
    dbPointsAdd({ points, username });
    response.sendStatus(204);
  } catch (error) {
    logger.error(
      { err: error, points, username },
      'Could not add points to user'
    );
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default pointsAdd;
