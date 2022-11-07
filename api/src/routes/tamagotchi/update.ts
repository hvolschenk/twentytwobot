import { RequestHandler } from 'express';

import dbTamagotchiUpdate from '../../database/tamagotchi/update';
import logger from '../../shared/logger';

interface RequestParameters {
  id: string;
}

interface RequestBody {
  name: string;
}

const tamagotchiUpdate: RequestHandler<
  RequestParameters,
  void,
  RequestBody
> = async (request, response, next) => {
  const { id } = request.params;
  const { name } = request.body;
  try {
    await dbTamagotchiUpdate({ id: parseInt(id, 10), name });
    response.sendStatus(204);
  } catch (error) {
    logger.error({ err: error });
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default tamagotchiUpdate;
