import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import React from 'react';

import SnackbarContext from './context';
import { SnackbarProviderValues } from './types';

interface SnackbarProviderProps {
  children: React.ReactNode;
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbars, setSnackbars] = React.useState<SnackbarProps[]>([]);

  const snackbar: SnackbarProps | undefined = React.useMemo(
    () => (snackbars.length > 0 ? snackbars[0] : undefined),
    [snackbars]
  );

  const dequeueSnackbar = React.useCallback(() => {
    setSnackbars(([, ...currentSnackbars]) => currentSnackbars);
  }, []);

  const enqueueSnackbar: SnackbarProviderValues['enqueueSnackbar'] =
    React.useCallback(
      (props) =>
        setSnackbars((currentSnackbars) => [...currentSnackbars, props]),
      []
    );

  const value: SnackbarProviderValues = React.useMemo(
    () => ({ enqueueSnackbar }),
    [enqueueSnackbar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {snackbar && (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Snackbar {...snackbar} onClose={dequeueSnackbar} open />
      )}
    </SnackbarContext.Provider>
  );
};

export default SnackbarProvider;
