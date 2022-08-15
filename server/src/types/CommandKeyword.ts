import { RowDataPacket } from 'mysql2';

export interface CommandKeyword extends RowDataPacket {
  commandID: number;
  id: number;
  isPrimary: boolean;
  keyword: string;
}
