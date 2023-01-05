import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import PageTitle from '~/src/components/PageTitle';
import { useSnackbar } from '~/src/providers/Snackbar';
import formatNumber from '~/src/shared/i18n/number';
import queryClient from '~/src/shared/queryClient';
import { root, timerEdit, timers } from '~/src/urls';

import { useTimer } from './context';
import DeleteDialog from './DeleteDialog';

const Timer: React.FC = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { timer } = useTimer();

  return (
    <React.Fragment>
      <PageTitle
        actions={
          <IconButton onClick={() => setIsDeleteDialogOpen(true)}>
            <DeleteIcon />
          </IconButton>
        }
        breadcrumbs={[
          { title: 'Home', url: root() },
          { title: 'Timers', url: timers() },
          { title: timer.name },
        ]}
        title={timer.name}
      />

      <Typography>
        Every {formatNumber(timer.intervalSeconds)} seconds
      </Typography>

      {timer.messages.length > 0 && (
        <List>
          {timer.messages.map((message) => (
            <ListItem key={message.id}>
              <ListItemButton>
                <ListItemText primary={message.message} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}

      <Fab
        color="primary"
        component={Link}
        sx={{
          bottom: (theme) => theme.spacing(2),
          position: 'fixed',
          right: (theme) => theme.spacing(2),
        }}
        to={timerEdit(timer.id.toString())}
      >
        <EditIcon />
      </Fab>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onError={() => {
          enqueueSnackbar({
            message: `Failed to delete timer ${timer.name}. Please try again`,
          });
        }}
        onSuccess={() => {
          enqueueSnackbar({
            message: `Timer ${timer.name} successfully deleted`,
          });
          queryClient.invalidateQueries({
            exact: true,
            queryKey: ['timers'],
          });
          navigate(timers());
        }}
        timer={timer}
      />
    </React.Fragment>
  );
};

export default Timer;
