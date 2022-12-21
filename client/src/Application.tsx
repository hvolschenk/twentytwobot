import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Base from './layouts/Base';
import Commands from './pages/commands/async';
import Home from './pages/home/async';
import Timers from './pages/timers/async';
import { Provider as SnackbarProvider } from './providers/Snackbar';
import ThemeProvider from './providers/Theme';
import queryClient from './shared/queryClient';
import { commands, root, timers, urlLayout } from './urls';

const Application: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <SnackbarProvider>
          <Routes>
            <Route element={<Base />}>
              <Route element={<Commands />} path={urlLayout(commands())} />
              <Route element={<Home />} path={urlLayout(root())} />
              <Route element={<Timers />} path={urlLayout(timers())} />
            </Route>
          </Routes>
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>
);

export default Application;
