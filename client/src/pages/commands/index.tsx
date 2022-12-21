import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  command,
  commandCreate,
  commands,
  urlLayout,
  urlRelative,
} from '~/src/urls';

import Command from './Command/async';
import CommandsPage from './Commands/async';
import Create from './Create';

const Commands: React.FC = () => (
  <Routes>
    <Route element={<CommandsPage />} index />
    <Route
      element={<Create />}
      path={urlRelative(commandCreate(), commands())}
    />
    <Route
      element={<Command />}
      path={urlLayout(urlRelative(command(), commands()))}
    />
  </Routes>
);

export default Commands;
