import Skeleton from '@mui/material/Skeleton';
import React from 'react';

const CommandLazy = React.lazy(() => import('./index'));

const CommandAsync: React.FC = () => (
  <React.Suspense
    fallback={
      <React.Fragment>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </React.Fragment>
    }
  >
    <CommandLazy />
  </React.Suspense>
);

export default CommandAsync;
