import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

import commandDelete from '~/src/api/commandDelete';
import { Command } from '~/src/types/Command';

interface DeleteDialogProps {
  command: Command;
  isOpen: boolean;
  onClose(): void;
  onError(): void;
  onSuccess(): void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  command,
  isOpen,
  onClose,
  onError,
  onSuccess,
}) => {
  const { mutate } = useMutation({
    mutationFn: commandDelete,
    mutationKey: ['command', 'delete', command.id],
  });
  const onDelete = React.useCallback(() => {
    mutate(
      { commandID: command.id },
      {
        onError,
        onSuccess,
      }
    );
  }, [command, mutate, onError, onSuccess]);

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>Delete {command.name}</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the command {command.name}?
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button color="primary" onClick={onDelete} variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
