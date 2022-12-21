import React from 'react';

import { CommandWithKeywords } from '~/src/types/CommandWithKeywords';

import { CommandContextValue } from './types';

const CommandContext = React.createContext<CommandContextValue>({
  command: {} as CommandWithKeywords,
  refetch: () => {},
});

export default CommandContext;
