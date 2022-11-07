import { RequestHandler } from 'express';

import dbTamagotchiGetByUsername from '../../database/tamagotchi/getByUsername';
import userGetByID from '../../database/user/getByID';
import logger from '../../shared/logger';
import { TamagotchiWithUser } from '../../types/TamagotchiWithUser';

interface RequestParameters {
  username: string;
}

const tamagotchiGetByUsername: RequestHandler<
  RequestParameters,
  TamagotchiWithUser
> = async (request, response, next) => {
  const { username } = request.params;
  try {
    const tamagotchi = await dbTamagotchiGetByUsername({ username });
    if (!tamagotchi) {
      response.sendStatus(404);
      return;
    }
    const user = await userGetByID({ id: tamagotchi.userID });
    if (!user) {
      response.sendStatus(404);
      return;
    }
    response.send({ ...tamagotchi, user });
  } catch (error) {
    logger.error(
      { err: error, username },
      'Failed to get tamagotchi by username'
    );
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default tamagotchiGetByUsername;
