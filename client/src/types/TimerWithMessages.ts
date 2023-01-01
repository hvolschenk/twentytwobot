import { Timer } from './Timer';
import { TimerMessage } from './TimerMessage';

export interface TimerWithMessages extends Timer {
  messages: TimerMessage[];
}
