import { RowDataPacket } from 'mysql2';

export interface TimerMessage extends RowDataPacket {
  id: number;
  timerID: number;
  message: string;
}
