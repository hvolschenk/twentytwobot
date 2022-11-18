import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import commandGetAll from '../../../api/commandGetAll';
import PageTitle from '../../../components/PageTitle';
import { root } from '../../../urls';
import List from './List';

const Commands: React.FC = () => {
  const { data, isError, isLoading, refetch } = useQuery({
    queryFn: commandGetAll,
    queryKey: ['commands'],
  });

  return (
    <React.Fragment>
      <PageTitle
        breadcrumbs={[{ title: 'Home', url: root() }, { title: 'Commands' }]}
        title="Commands"
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
          There was an error while fetching commands.
        </Alert>
      )}
      {!isError && isLoading && (
        <React.Fragment>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </React.Fragment>
      )}
      {!isError && !isLoading && data && <List commands={data.data} />}
    </React.Fragment>
  );
};

export default Commands;
