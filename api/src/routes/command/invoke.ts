import { RequestHandler } from 'express';

import commandLogCreate from '../../database/commandLog/create';
import logger from '../../shared/logger';
import { Command } from '../../types/Command';
import { User } from '../../types/User';

interface RequestParameters {
  commandID: Command['id'];
}

interface RequestBody {
  username: User['username'];
}

const commandInvoke: RequestHandler<
  RequestParameters,
  void,
  RequestBody
> = async (request, response, next) => {
  const { username } = request.body;
  const { commandID } = request.params;
  try {
    await commandLogCreate({ commandID, username });
    response.sendStatus(204);
  } catch (error) {
    logger.error(
      { commandID, err: error, username },
      'Failed to log command invocation'
    );
    response.sendStatus(500);
  } finally {
    next();
  }
};

export default commandInvoke;
