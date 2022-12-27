import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import MUIListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useSnackbar } from '~/src/providers/Snackbar';
import queryClient from '~/src/shared/queryClient';
import { Command } from '~/src/types/Command';
import { command as commandURL, commands } from '~/src/urls';

import DeleteDialog from '../Command/DeleteDialog';

interface ListItemProps {
  command: Command;
}

const ListItem: React.FC<ListItemProps> = ({ command }) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <React.Fragment>
      <MUIListItem
        key={command.id}
        secondaryAction={
          <IconButton onClick={() => setIsDeleteDialogOpen(true)}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemButton component={Link} to={commandURL(command.id.toString())}>
          <ListItemText
            primary={command.name}
            secondary={command.description}
          />
        </ListItemButton>
      </MUIListItem>
      <DeleteDialog
        command={command}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onError={() => {
          enqueueSnackbar({
            message: `Failed to delete command ${command.name}. Please try again`,
          });
        }}
        onSuccess={() => {
          enqueueSnackbar({
            message: `Command ${command.name} successfully deleted`,
          });
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

export default ListItem;
