import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Base from './layouts/Base';
import Commands from './pages/commands/async';
import Home from './pages/home/async';
import Timers from './pages/timers/async';
import ThemeProvider from './providers/Theme';
import { commands, root, timers, urlLayout } from './urls';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

const Application: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route element={<Base />}>
            <Route element={<Commands />} path={urlLayout(commands())} />
            <Route element={<Home />} path={urlLayout(root())} />
            <Route element={<Timers />} path={urlLayout(timers())} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>
);

export default Application;
