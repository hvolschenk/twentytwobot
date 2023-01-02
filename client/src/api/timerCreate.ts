import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { Timer } from '../types/Timer';

type Payload = Pick<Timer, 'intervalSeconds' | 'name'>;

const timerCreate = (payload: Payload) =>
  api.post<void, AxiosResponse<void>, Payload>('/timer', payload);

export default timerCreate;
