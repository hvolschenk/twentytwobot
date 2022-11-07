import { Command } from './Command';
import { CommandKeyword } from './CommandKeyword';

export interface CommandWithKeywords extends Command {
  keywords: CommandKeyword[];
}
