import { AxiosResponse } from 'axios';

import api from '../shared/api';

interface CommandDeleteOptions {
  commandID: number;
}

const commandDelete = (options: CommandDeleteOptions) =>
  api.delete<void, AxiosResponse<void>>(
    `/command/${options.commandID.toString()}`
  );

export default commandDelete;
