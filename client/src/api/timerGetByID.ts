import api from '../shared/api';
import { TimerWithMessages } from '../types/TimerWithMessages';

interface TimerGetByIDOptions {
  timerID: TimerWithMessages['id'];
}

const timerGetByID = (options: TimerGetByIDOptions) =>
  api.get<TimerWithMessages>(`/timer/${options.timerID}`);

export default timerGetByID;
