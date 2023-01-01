import MUIListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Link } from 'react-router-dom';

import formatNumber from '~/src/shared/i18n/number';
import { Timer } from '~/src/types/Timer';
import { timer as timerURL } from '~/src/urls';

interface ListItemProps {
  timer: Timer;
}

const ListItem: React.FC<ListItemProps> = ({ timer }) => (
  <MUIListItem key={timer.id}>
    <ListItemButton component={Link} to={timerURL(timer.id.toString())}>
      <ListItemText
        primary={timer.name}
        secondary={`Every ${formatNumber(timer.intervalSeconds)} seconds`}
      />
    </ListItemButton>
  </MUIListItem>
);

export default ListItem;
