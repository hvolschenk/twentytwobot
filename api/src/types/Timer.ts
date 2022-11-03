import { RowDataPacket } from 'mysql2';

export interface Timer extends RowDataPacket {
  id: number;
  name: string;
  intervalSeconds: number;
}
