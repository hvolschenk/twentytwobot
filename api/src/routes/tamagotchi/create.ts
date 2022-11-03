import { RequestHandler } from 'express';

import dbTamagotchiCreate from '../../database/tamagotchi/create';
import logger from '../../shared/logger';
import { User } from '../../types/User';

interface RequestBody {
  username: User['username'];
}

const tamagotchiCreate: RequestHandler<void, void, RequestBody> = async (
  request,
  response,
  next
) => {
  const { username } = request.body;
  try {
    await dbTamagotchiCreate({ username });
    response.sendStatus(204);
  } catch (error) {
    logger.error({ err: error, username }, 'Failed to create tamagotchi');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default tamagotchiCreate;
