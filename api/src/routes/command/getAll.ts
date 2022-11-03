import { RequestHandler } from 'express';

import dbCommandGetAll from '../../database/command/getAll';
import commandKeywordGetAll from '../../database/commandKeyword/getAll';
import logger from '../../shared/logger';
import { CommandWithKeywords } from '../../types/CommandWithKeywords';

const commandGetAll: RequestHandler<void, CommandWithKeywords[]> = async (
  request,
  response,
  next
) => {
  try {
    const [commands, keywords] = await Promise.all([
      dbCommandGetAll(),
      commandKeywordGetAll(),
    ]);
    const commandsWithKeywords = commands.map((command) => {
      const commandKeywords = keywords.filter(
        (keyword) => keyword.commandID === command.id
      );
      return { ...command, keywords: commandKeywords };
    });
    response.send(commandsWithKeywords);
  } catch (error) {
    logger.error({ err: error }, 'Failed to get all commands');
    response.sendStatus(500);
  }
  next();
};

export default commandGetAll;
