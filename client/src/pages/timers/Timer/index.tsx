import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import timerGetByID from '~/src/api/timerGetByID';
import PageTitle from '~/src/components/PageTitle';
import { root, TimerParams, timers } from '~/src/urls';

import { Provider as TimerProvider } from './context';
import TimerPage from './Timer';

const Timer: React.FC = () => {
  const { timerID } = useParams<TimerParams>() as TimerParams;
  const { data, isError, isLoading, refetch } = useQuery({
    queryFn: () => timerGetByID({ timerID: parseInt(timerID, 10) }),
    queryKey: ['timer', timerID],
  });

  if (isError) {
    return (
      <React.Fragment>
        <PageTitle
          breadcrumbs={[
            { title: 'Home', url: root() },
            { title: 'Timers', url: timers() },
            { title: 'Timer' },
          ]}
          title="Timer"
        />
        <Alert
          action={
            <Button color="inherit" onClick={() => refetch()}>
              Retry
            </Button>
          }
          severity="error"
        >
          There was an error fetching the timer.
        </Alert>
      </React.Fragment>
    );
  }

  if (isLoading) {
    return (
      <React.Fragment>
        <PageTitle
          breadcrumbs={[
            { title: 'Home', url: root() },
            { title: 'Timers', url: timers() },
            { title: 'Timer' },
          ]}
          title="Timer"
        />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </React.Fragment>
    );
  }

  if (data) {
    return (
      <TimerProvider refetch={refetch} value={data.data}>
        <Routes>
          <Route element={<TimerPage />} index />
        </Routes>
      </TimerProvider>
    );
  }

  return null;
};

export default Timer;
