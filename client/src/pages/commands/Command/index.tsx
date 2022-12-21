import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

import commandGetByID from '~/src/api/commandGetByID';
import PageTitle from '~/src/components/PageTitle';
import {
  command,
  commandEdit,
  CommandParams,
  commands,
  root,
  urlRelative,
} from '~/src/urls';

import CommandPage from './Command';
import { Provider as CommandProvider } from './context';
import Edit from './Edit';

const Command: React.FC = () => {
  const { commandID } = useParams<CommandParams>() as CommandParams;
  const { data, isError, isLoading, refetch } = useQuery({
    queryFn: () => commandGetByID({ commandID: parseInt(commandID, 10) }),
    queryKey: ['command', commandID],
  });

  if (isError) {
    return (
      <React.Fragment>
        <PageTitle
          breadcrumbs={[
            { title: 'Home', url: root() },
            { title: 'Commands', url: commands() },
            { title: 'Command' },
          ]}
          title="Command"
        />
        <Alert
          action={
            <Button color="inherit" onClick={() => refetch()}>
              Retry
            </Button>
          }
          severity="error"
        >
          There was an error fetching the command.
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
            { title: 'Commands', url: commands() },
            { title: 'Command' },
          ]}
          title="Command"
        />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </React.Fragment>
    );
  }

  if (data) {
    return (
      <CommandProvider refetch={refetch} value={data.data}>
        <Routes>
          <Route element={<CommandPage />} index />
          <Route
            element={<Edit />}
            path={urlRelative(commandEdit(), command())}
          />
        </Routes>
      </CommandProvider>
    );
  }

  return null;
};

export default Command;
