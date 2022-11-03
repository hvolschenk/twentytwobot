import { RowDataPacket } from 'mysql2';

export interface Command extends RowDataPacket {
  command: null | string;
  description: string;
  id: number;
  name: string;
}
