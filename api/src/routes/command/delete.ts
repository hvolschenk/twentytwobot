import { RequestHandler } from 'express';

import dbCommandDelete from '../../database/command/delete';
import commandKeywordDeleteByCommandID from '../../database/commandKeyword/deleteByCommandID';
import logger from '../../shared/logger';

interface RequestParameters {
  commandID: string;
}

const commandDelete: RequestHandler<RequestParameters> = async (
  request,
  response,
  next
) => {
  const { commandID } = request.params;
  try {
    const id = parseInt(commandID, 10);
    await commandKeywordDeleteByCommandID({ commandID: id });
    await dbCommandDelete({ id });
    response.sendStatus(204);
  } catch (error) {
    logger.error({ commandID, err: error }, 'Failed to delete command');
    response.sendStatus(500);
  }
  next();
};

export default commandDelete;
