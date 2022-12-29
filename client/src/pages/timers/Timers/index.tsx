import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import timerGetAll from '~/src/api/timerGetAll';
import PageTitle from '~/src/components/PageTitle';
import { root } from '~/src/urls';

import List from './List';

const Timers: React.FC = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryFn: timerGetAll,
    queryKey: ['timers'],
  });

  return (
    <React.Fragment>
      <PageTitle
        breadcrumbs={[{ title: 'Home', url: root() }, { title: 'Timers' }]}
        title="Timers"
      />

      {isError && (
        <Alert
          action={
            <Button color="inherit" onClick={() => refetch()}>
              Retry
            </Button>
          }
          severity="error"
        >
          There was an error while fetching timers.
        </Alert>
      )}

      {!isError && isLoading && (
        <React.Fragment>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </React.Fragment>
      )}

      {!isError && !isLoading && data && <List timers={data.data} />}
    </React.Fragment>
  );
};

export default Timers;
