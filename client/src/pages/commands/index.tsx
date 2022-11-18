import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Command from './command/async';
import CommandsPage from './commands/async';
import { command } from './urls';

const Commands: React.FC = () => (
  <Routes>
    <Route element={<CommandsPage />} index />
    <Route element={<Command />} path={`/${command()}`} />
  </Routes>
);

export default Commands;
