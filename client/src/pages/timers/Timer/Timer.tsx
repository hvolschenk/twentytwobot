import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from '~/src/components/PageTitle';
import formatNumber from '~/src/shared/i18n/number';
import { root, timerEdit, timers } from '~/src/urls';

import { useTimer } from './context';

const Timer: React.FC = () => {
  const { timer } = useTimer();

  return (
    <React.Fragment>
      <PageTitle
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
    </React.Fragment>
  );
};

export default Timer;
