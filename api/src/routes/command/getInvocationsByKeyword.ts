import { RequestHandler } from 'express';

import commandGetByKeyword from '../../database/command/getByKeyword';
import commandGetInvocationsCount from '../../database/command/getInvocationsCount';
import logger from '../../shared/logger';
import { CommandWithInvocations } from '../../types/CommandWithInvocations';

interface RequestParameters {
  keyword: string;
}

const commandGetInvocationsByKeyword: RequestHandler<
  RequestParameters,
  CommandWithInvocations
> = async (request, response, next) => {
  const { keyword } = request.params;
  try {
    const [command, invocations] = await Promise.all([
      commandGetByKeyword({ keyword }),
      commandGetInvocationsCount({ keyword }),
    ]);
    if (!command) {
      response.sendStatus(404);
      return;
    }
    const commandWithInvocations: CommandWithInvocations = {
      ...command,
      invocations,
    };
    response.send(commandWithInvocations);
  } catch (error) {
    logger.error({ keyword, err: error }, 'Failed to get command invocations');
  } finally {
    next();
  }
};

export default commandGetInvocationsByKeyword;
