import { AxiosResponse } from 'axios';

import api from '../shared/api';

interface TimerDeleteOptions {
  timerID: number;
}

const timerDelete = (options: TimerDeleteOptions) =>
  api.delete<void, AxiosResponse<void>>(`/timer/${options.timerID.toString()}`);

export default timerDelete;
