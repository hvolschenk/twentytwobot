import { RequestHandler } from 'express';

import dbCommandUpdate from '../../database/command/update';
import commandKeywordCreate from '../../database/commandKeyword/create';
import commandKeywordDeleteByCommandID from '../../database/commandKeyword/deleteByCommandID';
import logger from '../../shared/logger';
import { Command } from '../../types/Command';

interface RequestBody extends Command {
  keywords: string[];
}

interface RequestParameters {
  commandID: string;
}

const commandUpdate: RequestHandler<
  RequestParameters,
  void,
  RequestBody
> = async (request, response, next) => {
  const id = parseInt(request.params.commandID, 10);
  const { command, description, keywords, name } = request.body;
  try {
    await dbCommandUpdate({ command, description, id, name });
    await commandKeywordDeleteByCommandID({ commandID: id });
    await Promise.all(
      keywords.map((keyword, index) =>
        commandKeywordCreate({
          commandID: id,
          isPrimary: index === 0,
          keyword,
        })
      )
    );
    response.sendStatus(204);
  } catch (error) {
    logger.error({ err: error }, 'Failed to update the command');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default commandUpdate;
