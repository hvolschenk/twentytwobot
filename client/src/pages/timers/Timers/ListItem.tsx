import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import MUIListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSnackbar } from '~/src/providers/Snackbar';
import formatNumber from '~/src/shared/i18n/number';
import queryClient from '~/src/shared/queryClient';
import { Timer } from '~/src/types/Timer';
import { timer as timerURL, timers } from '~/src/urls';

import DeleteDialog from '../Timer/DeleteDialog';

interface ListItemProps {
  timer: Timer;
}

const ListItem: React.FC<ListItemProps> = ({ timer }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <React.Fragment>
      <MUIListItem
        secondaryAction={
          <IconButton onClick={() => setIsDeleteDialogOpen(true)}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemButton component={Link} to={timerURL(timer.id.toString())}>
          <ListItemText
            primary={timer.name}
            secondary={`Every ${formatNumber(timer.intervalSeconds)} seconds`}
          />
        </ListItemButton>
      </MUIListItem>

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

export default ListItem;
