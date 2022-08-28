import timerGetAll from '../database/timerGetAll';
import timerGetByID from '../database/timerGetByID';
import getTwitchClient from '../shared/getTwitchClient';
import { TimerWithMessage } from '../types/TimerWithMessage';

let hasStarted: boolean = false;

const startTimers = async (channel: string): Promise<void> => {
  if (!hasStarted) {
    const twitchClient = getTwitchClient();
    try {
      const timers = await timerGetAll();
      hasStarted = true;
      let totalSeconds: number = 0;
      setInterval(async () => {
        totalSeconds += 1;
        const timersToRun = timers
          .filter((timer) => totalSeconds % timer.intervalSeconds === 0)
          .map((timer) => timerGetByID({ id: timer.id }));
        if (timersToRun.length > 0) {
          const timersWithMessage = await Promise.all(timersToRun);
          timersWithMessage
            .filter(
              (timerWithMessage): timerWithMessage is TimerWithMessage =>
                timerWithMessage !== null
            )
            .forEach((timerWithMessage) => {
              twitchClient.say(channel, timerWithMessage.message);
            });
        }
      }, 1000);
    } catch (error) {
      twitchClient.say(
        channel,
        'Tell @22atreyu22 that the timers could not be loaded.'
      );
    }
  }
};

export default startTimers;
