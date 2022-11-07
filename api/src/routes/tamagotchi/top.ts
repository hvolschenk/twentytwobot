import { RequestHandler } from 'express';

import tamagotchiGetTop from '../../database/tamagotchi/getTop';
import userGetByID from '../../database/user/getByID';
import logger from '../../shared/logger';
import { TamagotchiWithUser } from '../../types/TamagotchiWithUser';

interface RequestParameters {
  count: string;
}

const tamagotchiTop: RequestHandler<
  RequestParameters,
  TamagotchiWithUser[]
> = async (request, response, next) => {
  const { count } = request.params;
  try {
    const tamagotchis = await tamagotchiGetTop({ count: parseInt(count, 10) });
    const users = await Promise.all(
      tamagotchis.map((tamagotchi) => userGetByID({ id: tamagotchi.userID }))
    );
    const tamagotchisWithUser: TamagotchiWithUser[] = tamagotchis.map(
      (tamagotchi, index) => ({ ...tamagotchi, user: users[index]! })
    );
    response.send(tamagotchisWithUser);
  } catch (error) {
    logger.error({ err: error }, 'Failed to get top tamagotchis');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default tamagotchiTop;
