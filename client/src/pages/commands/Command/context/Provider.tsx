import React from 'react';

import CommandContext from './CommandContext';
import { CommandContextValue } from './types';

interface ProviderProps {
  children: React.ReactNode;
  refetch: CommandContextValue['refetch'];
  value: CommandContextValue['command'];
}

const Provider: React.FC<ProviderProps> = ({ children, refetch, value }) => {
  const contextValue = React.useMemo<CommandContextValue>(
    () => ({ command: value, refetch }),
    [refetch, value]
  );

  return (
    <CommandContext.Provider value={contextValue}>
      {children}
    </CommandContext.Provider>
  );
};

export default Provider;
