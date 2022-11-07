import { RequestHandler } from 'express';

import dbPointsGetByUsername from '../../database/points/getByUsername';
import userGetByUsername from '../../database/user/getByUsername';
import logger from '../../shared/logger';
import { User } from '../../types/User';
import { UserWithPoints } from '../../types/UserWithPoints';

interface RequestParameters {
  username: User['username'];
}

const pointsGetByUsername: RequestHandler<
  RequestParameters,
  UserWithPoints
> = async (request, response, next) => {
  const { username } = request.params;
  try {
    const user = await userGetByUsername({ username });
    if (!user) {
      response.sendStatus(404);
      return;
    }
    const points = await dbPointsGetByUsername({ username });
    if (!points) {
      logger.error({ username }, 'User has no points (get points)');
      response.sendStatus(404);
      return;
    }
    response.send({ ...user, points });
  } catch (error) {
    logger.error({ err: error, username }, 'Failed to get points by username');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default pointsGetByUsername;
