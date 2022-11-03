import { RequestHandler } from 'express';

import dbPointsGetTop from '../../database/points/getTop';
import userGetByID from '../../database/user/getByID';
import logger from '../../shared/logger';
import { User } from '../../types/User';
import { UserWithPoints } from '../../types/UserWithPoints';

interface RequestParameters {
  count: string;
}

const pointsGetTop: RequestHandler<
  RequestParameters,
  UserWithPoints[]
> = async (request, response, next) => {
  try {
    const points = await dbPointsGetTop({
      count: parseInt(request.params.count, 10),
    });
    const userPromises = points.map((point) =>
      userGetByID({ id: point.userID })
    );
    const users = await Promise.all(userPromises);
    const usersWithPoints: UserWithPoints[] = users
      .filter((user): user is User => user !== null)
      .map((user, index) => {
        const userWithPoints: UserWithPoints = {
          ...user,
          points: points[index],
        };
        return userWithPoints;
      });
    response.send(usersWithPoints);
  } catch (error) {
    logger.error({ err: error }, 'Failed to get top points');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default pointsGetTop;
