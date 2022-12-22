import Skeleton from '@mui/material/Skeleton';
import React from 'react';

const CommandsLazy = React.lazy(() => import('./index'));

const CommandsAsync: React.FC = () => (
  <React.Suspense
    fallback={
      <React.Fragment>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </React.Fragment>
    }
  >
    <CommandsLazy />
  </React.Suspense>
);

export default CommandsAsync;
