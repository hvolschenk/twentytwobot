import { Timer } from './Timer';

export interface TimerMessage {
  id: number;
  timerID: Timer['id'];
  message: string;
}
