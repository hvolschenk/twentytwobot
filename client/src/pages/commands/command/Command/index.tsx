import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';

import PageTitle from '~/src/components/PageTitle';
import { commands, root } from '~/src/urls';

import { useCommand } from '../context';

const Command: React.FC = () => {
  const { command } = useCommand();

  return (
    <React.Fragment>
      <PageTitle
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
    </React.Fragment>
  );
};

export default Command;
