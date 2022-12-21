import React from 'react';

import SnackbarContext from './context';

const useSnackbar = () => {
  const context = React.useContext(SnackbarContext);
  return context;
};

export default useSnackbar;
