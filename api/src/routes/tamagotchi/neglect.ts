import { RequestHandler } from 'express';

import dbTamagotchiNeglect from '../../database/tamagotchi/neglect';
import logger from '../../shared/logger';

interface RequestBody {
  clean?: number;
  entertainment?: number;
  food?: number;
}

interface RequestParameters {
  id: string;
}

const tamagotchiNeglect: RequestHandler<
  RequestParameters,
  void,
  RequestBody
> = async (request, response, next) => {
  const { id } = request.params;
  const { clean, entertainment, food } = request.body;
  try {
    await dbTamagotchiNeglect({
      clean: clean || null,
      entertainment: entertainment || null,
      food: food || null,
      id: parseInt(id, 10),
    });
    response.sendStatus(204);
  } catch (error) {
    logger.error(
      { clean, entertainment, err: error, food, id },
      'Failed to neglect tamagotchi'
    );
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default tamagotchiNeglect;
