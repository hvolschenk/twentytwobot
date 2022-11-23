import { CommandWithKeywords } from '~/src/types/CommandWithKeywords';

export interface CommandContextValue {
  command: CommandWithKeywords;
  refetch(): void;
}
