import React from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitle from '~/src/components/PageTitle';
import { useSnackbar } from '~/src/providers/Snackbar';
import queryClient from '~/src/shared/queryClient';
import { command as commandURL, commands, root } from '~/src/urls';

import { useCommand } from './context';
import Form from './Form';

const Edit: React.FC = () => {
  const { command } = useCommand();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <React.Fragment>
      <PageTitle
        breadcrumbs={[
          { title: 'Home', url: root() },
          { title: 'Commands', url: commands() },
          { title: command.name, url: commandURL(command.id.toString()) },
          { title: 'Edit command' },
        ]}
        title={`Edit command: ${command.name}`}
      />
      <Form
        command={command}
        onError={() => {
          enqueueSnackbar({
            message: 'Failed to update command, please try again',
          });
        }}
        onSuccess={() => {
          enqueueSnackbar({ message: 'Command updated successfully' });
          queryClient.invalidateQueries({
            exact: true,
            queryKey: ['commands'],
          });
          navigate(commands());
        }}
      />
    </React.Fragment>
  );
};

export default Edit;
