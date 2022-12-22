import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { Command } from '../types/Command';

type Payload = Pick<Command, 'command' | 'description' | 'id' | 'name'> & {
  keywords: string[];
};

const commandUpdate = (payload: Payload) =>
  api.put<void, AxiosResponse<void>, Payload>(
    `/command/${payload.id}`,
    payload
  );

export default commandUpdate;
