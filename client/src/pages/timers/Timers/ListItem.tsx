import MUIListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import formatNumber from '~/src/shared/i18n/number';
import { Timer } from '~/src/types/Timer';

interface ListItemProps {
  timer: Timer;
}

const ListItem: React.FC<ListItemProps> = ({ timer }) => (
  <MUIListItem key={timer.id}>
    <ListItemButton>
      <ListItemText
        primary={timer.name}
        secondary={`Every ${formatNumber(timer.intervalSeconds)} seconds`}
      />
    </ListItemButton>
  </MUIListItem>
);

export default ListItem;
