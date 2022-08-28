import { RowDataPacket } from 'mysql2';

import { Timer } from './Timer';
import { TimerMessage } from './TimerMessage';

export interface TimerWithMessage extends RowDataPacket {
  id: Timer['id'];
  intervalSeconds: Timer['intervalSeconds'];
  message: TimerMessage['message'];
  name: Timer['name'];
}
