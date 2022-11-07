import { RowDataPacket } from 'mysql2';

import { Command } from './Command';

export interface CommandKeyword extends RowDataPacket {
  commandID: Command['id'];
  id: number;
  isPrimary: boolean;
  keyword: string;
}
