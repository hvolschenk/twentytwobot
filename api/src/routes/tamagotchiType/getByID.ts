import { RequestHandler } from 'express';
import { TamagotchiType } from 'src/types/TamagotchiType';

import dbTamagotchiGetByID from '../../database/tamagotchiType/getByID';
import logger from '../../shared/logger';

interface RequestParameters {
  id: string;
}

const tamagotchiTypeGetByID: RequestHandler<
  RequestParameters,
  TamagotchiType
> = async (request, response, next) => {
  const { id } = request.params;
  try {
    const tamagotchiType = await dbTamagotchiGetByID({ id: parseInt(id, 10) });
    if (!tamagotchiType) {
      response.sendStatus(404);
      return;
    }
    response.send(tamagotchiType);
  } catch (error) {
    logger.error({ err: error, id }, 'Failed to get tamagotchi');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default tamagotchiTypeGetByID;
