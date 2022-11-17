import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Base from './layouts/Base';
import Commands from './pages/commands/async';
import urlCommands from './pages/commands/urls';
import Home from './pages/home/async';
import Timers from './pages/timers/async';
import ThemeProvider from './providers/Theme';
import { root, timers } from './urls';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
});

const Application: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route element={<Base />} path={root()}>
            <Route element={<Commands />} path={urlCommands.urlRouter()} />
            <Route element={<Home />} path={root()} />
            <Route element={<Timers />} path={timers()} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
    <ReactQueryDevtools />
  </QueryClientProvider>
);

export default Application;
