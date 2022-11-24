import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { command, commands, urlLayout, urlRelative } from '~/src/urls';

import Command from './command/async';
import CommandsPage from './commands/async';

const Commands: React.FC = () => (
  <Routes>
    <Route element={<CommandsPage />} index />
    <Route
      element={<Command />}
      path={urlLayout(urlRelative(command(), commands()))}
    />
  </Routes>
);

export default Commands;
