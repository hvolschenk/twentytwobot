import timerGetAll from '../api/timerGetAll';
import timerMessageGetRandomByTimerID from '../api/timerMessageGetRandomByTimerID';
import getTwitchClient from '../shared/getTwitchClient';
import { Timer } from '../types/Timer';
import { TimerMessage } from '../types/TimerMessage';

// -----------------------------------------------------------------------------
// Private ---------------------------------------------------------------------
// -----------------------------------------------------------------------------
const getTimers = async (): Promise<Timer[]> => {
  try {
    const timers = await timerGetAll();
    return timers.status === 200 ? timers.data : [];
  } catch (error) {
    return [];
  }
};

const getTimerMessage = async (
  timerID: Timer['id']
): Promise<TimerMessage | null> => {
  try {
    const timerMessage = await timerMessageGetRandomByTimerID({ timerID });
    return timerMessage.status === 200 ? timerMessage.data : null;
  } catch (error) {
    return null;
  }
};

// -----------------------------------------------------------------------------
// Public ----------------------------------------------------------------------
// -----------------------------------------------------------------------------
let hasStarted: boolean = false;

const startTimers = async (channel: string): Promise<void> => {
  if (hasStarted) {
    return;
  }
  const timers = await getTimers();
  if (timers.length === 0) {
    return;
  }

  const twitchClient = getTwitchClient();
  hasStarted = true;
  let totalSeconds: number = 0;
  setInterval(async () => {
    totalSeconds += 1;
    const activeTimers = timers.filter(
      (timer) => totalSeconds % timer.intervalSeconds === 0
    );
    // eslint-disable-next-line no-restricted-syntax
    for (const timer of activeTimers) {
      // eslint-disable-next-line no-await-in-loop
      const timerMessage = await getTimerMessage(timer.id);
      if (timerMessage) {
        twitchClient.say(channel, timerMessage.message);
      }
    }
  }, 1000);
};

export default startTimers;
