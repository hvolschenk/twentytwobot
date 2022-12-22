import { RequestHandler } from 'express';

import dbCommandCreate from '../../database/command/create';
import commandKeywordCreate from '../../database/commandKeyword/create';
import commandGetByName from '../../database/command/getByName';
import logger from '../../shared/logger';
import { Command } from '../../types/Command';

interface RequestBody extends Command {
  keywords: string[];
}

const commandCreate: RequestHandler<void, void, RequestBody> = async (
  request,
  response,
  next
) => {
  const { command, description, keywords, name } = request.body;
  try {
    await dbCommandCreate({ command, description, name });
    const createdCommand = await commandGetByName({ name });
    if (!createdCommand) {
      throw new Error('Command does not exist');
    }
    await Promise.all(
      keywords.map((keyword, index) =>
        commandKeywordCreate({
          commandID: createdCommand.id,
          isPrimary: index === 0,
          keyword,
        })
      )
    );
    response.sendStatus(204);
  } catch (error) {
    logger.error({ err: error }, 'Failed to create the command');
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default commandCreate;
