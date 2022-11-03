import { RequestHandler } from 'express';

import dbShoutoutLogFilter from '../../database/shoutoutLog/filter';
import logger from '../../shared/logger';
import { ShoutoutLog } from '../../types/ShoutoutLog';
import { User } from '../../types/User';

interface RequestQuery {
  count: string;
  usernameFrom?: User['username'];
  usernameTo: User['username'];
}

const shoutoutLogFilter: RequestHandler<
  void,
  ShoutoutLog[],
  void,
  RequestQuery
> = async (request, response, next) => {
  const { count, usernameFrom, usernameTo } = request.query;
  try {
    const shoutoutLogs = await dbShoutoutLogFilter({
      count: parseInt(count, 10),
      usernameFrom,
      usernameTo,
    });
    response.send(shoutoutLogs);
  } catch (error) {
    logger.error(
      { err: error, usernameFrom, usernameTo },
      'Failed to get shoutout logs'
    );
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default shoutoutLogFilter;
