import React from 'react';

const HomeLazy = React.lazy(() => import('./index'));

const HomeAsync: React.FC = () => (
  <React.Suspense fallback={<p>Loading home page</p>}>
    <HomeLazy />
  </React.Suspense>
);

export default HomeAsync;
