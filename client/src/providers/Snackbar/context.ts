import React from 'react';

import { SnackbarProviderValues } from './types';

export default React.createContext<SnackbarProviderValues>({
  enqueueSnackbar: () => {},
});
