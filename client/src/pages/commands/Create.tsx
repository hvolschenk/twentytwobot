import React from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitle from '~/src/components/PageTitle';
import { useSnackbar } from '~/src/providers/Snackbar';
import queryClient from '~/src/shared/queryClient';
import { commands, root } from '~/src/urls';

import Form from './Command/Form';

const Create: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <React.Fragment>
      <PageTitle
        breadcrumbs={[
          { title: 'Home', url: root() },
          { title: 'Commands', url: commands() },
          { title: 'Create command' },
        ]}
        title="Create command"
      />

      <Form
        onError={() => {
          enqueueSnackbar({ message: 'Failed to create the command' });
        }}
        onSuccess={() => {
          enqueueSnackbar({ message: 'Command created successfully' });
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

export default Create;
