import React from 'react';

import { TimerWithMessages } from '~/src/types/TimerWithMessages';

import { TimerContextValue } from './types';

const TimerContext = React.createContext<TimerContextValue>({
  refetch: () => {},
  timer: {} as TimerWithMessages,
});

export default TimerContext;
