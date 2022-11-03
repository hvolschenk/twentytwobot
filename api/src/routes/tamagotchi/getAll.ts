import { RequestHandler } from 'express';

import dbTamagotchiGetAll from '../../database/tamagotchi/getAll';
import userGetByID from '../../database/user/getByID';
import logger from '../../shared/logger';
import { TamagotchiWithUser } from '../../types/TamagotchiWithUser';

const tamagotchiGetAll: RequestHandler<void, TamagotchiWithUser[]> = async (
  request,
  response,
  next
) => {
  try {
    const tamagotchis = await dbTamagotchiGetAll();
    const users = await Promise.all(
      tamagotchis.map((tamagotchi) => userGetByID({ id: tamagotchi.userID }))
    );
    const tamagotchisWithUser: TamagotchiWithUser[] = tamagotchis.map(
      (tamagotchi, index) => ({ ...tamagotchi, user: users[index]! })
    );
    response.send(tamagotchisWithUser);
  } catch (error) {
    logger.error({ err: error }, 'Failed to get all tamagotchis');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default tamagotchiGetAll;
