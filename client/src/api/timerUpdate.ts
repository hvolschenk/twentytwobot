import { AxiosResponse } from 'axios';

import api from '../shared/api';
import { Timer } from '../types/Timer';

type Payload = Pick<Timer, 'id' | 'intervalSeconds' | 'name'>;

const timerUpdate = (payload: Payload) =>
  api.put<void, AxiosResponse<void>, Payload>(`/timer/${payload.id}`, payload);

export default timerUpdate;
