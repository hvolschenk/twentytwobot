import { RequestHandler } from 'express';

import dbCommandGetByID from '../../database/command/getByID';
import commandKeywordGetAllByCommandID from '../../database/commandKeyword/getAllByCommandID';
import logger from '../../shared/logger';
import { CommandWithKeywords } from '../../types/CommandWithKeywords';

interface RequestParameters {
  commandID: string;
}

const commandGetByID: RequestHandler<
  RequestParameters,
  CommandWithKeywords
> = async (request, response, next) => {
  const { commandID } = request.params;
  try {
    const id = parseInt(commandID, 10);
    const [command, keywords] = await Promise.all([
      dbCommandGetByID({ id }),
      commandKeywordGetAllByCommandID({ id }),
    ]);
    if (!command) {
      response.sendStatus(404);
    } else {
      response.send({ ...command, keywords });
    }
  } catch (error) {
    logger.error({ err: error }, `Failed to get command '${commandID}'`);
  }
  next();
};

export default commandGetByID;
