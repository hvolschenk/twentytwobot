import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { timer, timers, urlLayout, urlRelative } from '~/src/urls';

import Timer from './Timer';
import TimersPage from './Timers/async';

const Timers: React.FC = () => (
  <Routes>
    <Route element={<TimersPage />} index />
    <Route
      element={<Timer />}
      path={urlLayout(urlRelative(timer(), timers()))}
    />
  </Routes>
);

export default Timers;
