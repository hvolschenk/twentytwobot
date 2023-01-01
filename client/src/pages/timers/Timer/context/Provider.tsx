import React from 'react';

import TimerContext from './TimerContext';
import { TimerContextValue } from './types';

interface ProviderProps {
  children: React.ReactNode;
  refetch: TimerContextValue['refetch'];
  value: TimerContextValue['timer'];
}

const Provider: React.FC<ProviderProps> = ({ children, refetch, value }) => {
  const contextValue = React.useMemo<TimerContextValue>(
    () => ({ refetch, timer: value }),
    [refetch, value]
  );

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
};

export default Provider;
