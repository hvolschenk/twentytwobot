import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TimersPage from './Timers/async';

const Timers: React.FC = () => (
  <Routes>
    <Route element={<TimersPage />} index />
  </Routes>
);

export default Timers;
