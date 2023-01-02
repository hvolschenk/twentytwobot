import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

import timerGetAll from '~/src/api/timerGetAll';
import PageTitle from '~/src/components/PageTitle';
import { root, timerCreate } from '~/src/urls';

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

      <Fab
        color="primary"
        component={Link}
        sx={{
          bottom: (theme) => theme.spacing(2),
          position: 'fixed',
          right: (theme) => theme.spacing(2),
        }}
        to={timerCreate()}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  );
};

export default Timers;
