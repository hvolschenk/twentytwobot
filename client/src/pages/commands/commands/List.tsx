import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MUIList from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import React from 'react';
import { Link } from 'react-router-dom';

import { CommandWithKeywords } from '../../../types/CommandWithKeywords';
import urlCommands, { command as urlCommand } from '../urls';

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
          <ListItem key={command.id}>
            <ListItemButton
              component={Link}
              to={urlCommands.url(urlCommand(command.id.toString()))}
            >
              <ListItemText
                primary={command.name}
                secondary={command.description}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </MUIList>
    </Paper>
  );
};

export default List;
