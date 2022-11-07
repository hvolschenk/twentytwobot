import { RequestHandler } from 'express';

import tamagotchiDieByID from '../../database/tamagotchi/dieByID';
import logger from '../../shared/logger';

interface RequestParameters {
  id: string;
}

const tamagotchiDie: RequestHandler<RequestParameters> = async (
  request,
  response,
  next
) => {
  const { id } = request.params;
  try {
    await tamagotchiDieByID({ id: parseInt(id, 10) });
    response.sendStatus(204);
  } catch (error) {
    logger.error({ err: error }, 'Tamagotchi failed to die');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default tamagotchiDie;
