import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { Command } from '../types/Command';
import { User } from '../types/User';

interface CommandInvokeOptions {
  commandID: Command['id'];
  username: User['username'];
}

const commandInvoke = (options: CommandInvokeOptions) =>
  api.post<void, AxiosResponse<void>, Pick<CommandInvokeOptions, 'username'>>(
    `/command/${options.commandID}/invoke`,
    { username: options.username }
  );

export default commandInvoke;
