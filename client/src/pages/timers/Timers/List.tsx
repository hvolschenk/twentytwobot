import MUIList from '@mui/material/List';
import Paper from '@mui/material/Paper';
import React from 'react';

import { Timer } from '~/src/types/Timer';

import ListItem from './ListItem';

interface ListProps {
  timers: Timer[];
}

const List: React.FC<ListProps> = ({ timers }) => (
  <Paper>
    <MUIList>
      {timers.map((timer) => (
        <ListItem key={timer.id} timer={timer} />
      ))}
    </MUIList>
  </Paper>
);

export default List;
