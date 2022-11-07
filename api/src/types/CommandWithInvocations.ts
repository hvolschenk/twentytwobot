import { Command } from './Command';

export interface CommandWithInvocations extends Command {
  invocations: number;
}
