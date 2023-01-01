import Skeleton from '@mui/material/Skeleton';
import React from 'react';

const TimerLazy = React.lazy(() => import('./index'));

const TimerAsync: React.FC = () => (
  <React.Suspense
    fallback={
      <React.Fragment>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </React.Fragment>
    }
  >
    <TimerLazy />
  </React.Suspense>
);

export default TimerAsync;
