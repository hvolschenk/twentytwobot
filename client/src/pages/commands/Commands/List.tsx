import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MUIList from '@mui/material/List';
import Paper from '@mui/material/Paper';
import React from 'react';

import { CommandWithKeywords } from '../../../types/CommandWithKeywords';
import ListItem from './ListItem';

interface ListProps {
  commands: CommandWithKeywords[];
}

const List: React.FC<ListProps> = ({ commands }) => {
  if (commands.length === 0) {
    return (
      <Alert action={<Button color="inherit">Add</Button>} severity="info">
        There are currently no commands.
      </Alert>
    );
  }

  return (
    <Paper>
      <MUIList>
        {commands.map((command) => (
          <ListItem command={command} />
        ))}
      </MUIList>
    </Paper>
  );
};

export default List;
