import React from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitle from '~/src/components/PageTitle';
import { useSnackbar } from '~/src/providers/Snackbar';
import queryClient from '~/src/shared/queryClient';
import { root, timers } from '~/src/urls';

import Form from './Timer/Form';

const Create: React.FC = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <React.Fragment>
      <PageTitle
        breadcrumbs={[
          { title: 'Home', url: root() },
          { title: 'Timers', url: timers() },
          { title: 'Create timer' },
        ]}
        title="Create timer"
      />

      <Form
        onError={() => {
          enqueueSnackbar({ message: 'Failed to create the timer' });
        }}
        onSuccess={() => {
          enqueueSnackbar({ message: 'Timer created successfully' });
          queryClient.invalidateQueries({
            exact: true,
            queryKey: ['timers'],
          });
          navigate(timers());
        }}
      />
    </React.Fragment>
  );
};

export default Create;
