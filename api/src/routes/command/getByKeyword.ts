import { RequestHandler } from 'express';

import dbCommandGetByKeyword from '../../database/command/getByKeyword';
import commandKeywordGetAllByCommandID from '../../database/commandKeyword/getAllByCommandID';
import logger from '../../shared/logger';
import { CommandWithKeywords } from '../../types/CommandWithKeywords';

interface RequestParameters {
  keyword: string;
}

const commandGetByKeyword: RequestHandler<
  RequestParameters,
  CommandWithKeywords
> = async (request, response, next) => {
  const { keyword } = request.params;
  try {
    const command = await dbCommandGetByKeyword({ keyword });
    if (!command) {
      response.sendStatus(404);
    } else {
      const { id } = command;
      const keywords = await commandKeywordGetAllByCommandID({ id });
      response.send({ ...command, keywords });
    }
  } catch (error) {
    logger.error(
      { err: error },
      `Failed to get command by keyword '${keyword}'`
    );
  }
  next();
};

export default commandGetByKeyword;
