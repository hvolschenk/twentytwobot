import { RequestHandler } from 'express';

import pointsAdd from '../../database/points/add';
import pointsGetByUsername from '../../database/points/getByUsername';
import pointsRemove from '../../database/points/remove';
import logger from '../../shared/logger';
import { Points } from '../../types/Points';
import { User } from '../../types/User';

interface RequestBody {
  from: User['username'];
  points: Points['points'];
  to: User['username'];
}

const pointsGive: RequestHandler<void, void, RequestBody> = async (
  request,
  response,
  next
) => {
  try {
    const { from, points, to } = request.body;
    const userFromPoints = await pointsGetByUsername({ username: from });
    if (!userFromPoints) {
      logger.error(
        { username: from },
        'The (from) user does not have a points entry'
      );
      response.sendStatus(404);
      return;
    }
    if (userFromPoints.points < points) {
      response.sendStatus(400);
      return;
    }
    const userToPoints = await pointsGetByUsername({ username: to });
    if (!userToPoints) {
      logger.error(
        { username: to },
        'The (to) user does not have a points entry'
      );
      response.sendStatus(404);
      return;
    }
    await pointsRemove({ points, username: from });
    await pointsAdd({ points, username: to });
    response.sendStatus(204);
  } catch (error) {
    logger.error({ err: error }, 'Failed to give points');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default pointsGive;
