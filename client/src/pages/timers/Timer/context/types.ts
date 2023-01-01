import { TimerWithMessages } from '~/src/types/TimerWithMessages';

export interface TimerContextValue {
  refetch(): void;
  timer: TimerWithMessages;
}
