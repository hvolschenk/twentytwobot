import React from 'react';

import Home from './index';

const HomeAsync: React.FC = () => (
  <React.Suspense fallback={<p>Loading home page</p>}>
    <Home />
  </React.Suspense>
);

export default HomeAsync;
