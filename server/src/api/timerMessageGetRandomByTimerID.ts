import api from '../shared/api';
import { Timer } from '../types/Timer';
import { TimerMessage } from '../types/TimerMessage';

interface TimerMessageGetRandomByTimerIDOptions {
  timerID: Timer['id'];
}

const timerMessageGetRandomByTimerID = (
  options: TimerMessageGetRandomByTimerIDOptions
) => api.get<TimerMessage>(`/timer/${options.timerID}/message`);

export default timerMessageGetRandomByTimerID;
