import Skeleton from '@mui/material/Skeleton';
import React from 'react';

const TimersLazy = React.lazy(() => import('./index'));

const TimersAsync: React.FC = () => (
  <React.Suspense
    fallback={
      <React.Fragment>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </React.Fragment>
    }
  >
    <TimersLazy />
  </React.Suspense>
);

export default TimersAsync;
