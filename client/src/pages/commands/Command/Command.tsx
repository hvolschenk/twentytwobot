import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import PageTitle from '~/src/components/PageTitle';
import { useSnackbar } from '~/src/providers/Snackbar';
import queryClient from '~/src/shared/queryClient';
import { commandEdit, commands, root } from '~/src/urls';

import { useCommand } from './context';
import DeleteDialog from './DeleteDialog';

const Command: React.FC = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    React.useState<boolean>(false);

  const { command } = useCommand();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

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
          { title: 'Commands', url: commands() },
          { title: command.name },
        ]}
        title={command.name}
      />
      <Stack direction="row" spacing={1}>
        {command.keywords.map((keyword) => (
          <Chip
            color={keyword.isPrimary ? 'primary' : 'secondary'}
            key={keyword.id}
            label={keyword.keyword}
            size="small"
          />
        ))}
      </Stack>
      <Box marginTop={2}>
        <Typography>{command.description}</Typography>
      </Box>
      <Fab
        color="primary"
        component={Link}
        sx={{
          bottom: (theme) => theme.spacing(2),
          position: 'fixed',
          right: (theme) => theme.spacing(2),
        }}
        to={commandEdit(command.id.toString())}
      >
        <EditIcon />
      </Fab>

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

export default Command;
