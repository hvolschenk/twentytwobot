import React from 'react';
import { useNavigate } from 'react-router-dom';

import PageTitle from '~/src/components/PageTitle';
import { useSnackbar } from '~/src/providers/Snackbar';
import queryClient from '~/src/shared/queryClient';
import { timer as timerURL, timers, root } from '~/src/urls';

import { useTimer } from './context';
import Form from './Form';

const Edit: React.FC = () => {
  const { timer } = useTimer();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <React.Fragment>
      <PageTitle
        breadcrumbs={[
          { title: 'Home', url: root() },
          { title: 'Timers', url: timers() },
          { title: timer.name, url: timerURL(timer.id.toString()) },
          { title: 'Edit timer' },
        ]}
        title={`Edit timer: ${timer.name}`}
      />
      <Form
        timer={timer}
        onError={() => {
          enqueueSnackbar({
            message: 'Failed to update timer, please try again',
          });
        }}
        onSuccess={() => {
          enqueueSnackbar({ message: 'Timer updated successfully' });
          queryClient.invalidateQueries({
            exact: true,
            queryKey: ['timers'],
          });
          queryClient.invalidateQueries({
            exact: true,
            queryKey: ['timers', timer.id],
          });
          navigate(timers());
        }}
      />
    </React.Fragment>
  );
};

export default Edit;
