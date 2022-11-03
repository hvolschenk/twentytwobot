import { RowDataPacket } from 'mysql2';

import { Timer } from './Timer';

export interface TimerMessage extends RowDataPacket {
  id: number;
  timerID: Timer['id'];
  message: string;
}
