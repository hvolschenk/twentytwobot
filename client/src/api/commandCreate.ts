import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { Command } from '../types/Command';

type Payload = Pick<Command, 'command' | 'description' | 'name'> & {
  keywords: string[];
};

const commandCreate = (payload: Payload) =>
  api.post<void, AxiosResponse<void>, Payload>('/command', payload);

export default commandCreate;
