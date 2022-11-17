import { Command } from './Command';

export interface CommandKeyword {
  commandID: Command['id'];
  id: number;
  isPrimary: boolean;
  keyword: string;
}
