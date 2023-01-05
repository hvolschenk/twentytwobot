import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation } from '@tanstack/react-query';
import React from 'react';

import timerDelete from '~/src/api/timerDelete';
import { Timer } from '~/src/types/Timer';

interface DeleteDialogProps {
  isOpen: boolean;
  onClose(): void;
  onError(): void;
  onSuccess(): void;
  timer: Timer;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onClose,
  onError,
  onSuccess,
  timer,
}) => {
  const { mutate } = useMutation({
    mutationFn: timerDelete,
    mutationKey: ['timer', 'delete', timer.id],
  });
  const onDelete = React.useCallback(() => {
    mutate(
      { timerID: timer.id },
      {
        onError,
        onSuccess,
      }
    );
  }, [timer, mutate, onError, onSuccess]);

  return (
    <Dialog onClose={onClose} open={isOpen}>
      <DialogTitle>Delete {timer.name}</DialogTitle>
      <DialogContent>
        Are you sure you want to delete the timer {timer.name}?
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
