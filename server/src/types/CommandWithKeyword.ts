// A combination type of the `Command` and `CommandKeyword` types.
// Easier for the server to process and do something with.
import { RowDataPacket } from 'mysql2';

import { Command } from './Command';
import { CommandKeyword } from './CommandKeyword';

// Used when fetching a full list of all commands.
export interface CommandWithKeyword extends RowDataPacket {
  command: Command['command'];
  commandID: Command['id'];
  id: CommandKeyword['id'];
  keyword: CommandKeyword['keyword'];
}
