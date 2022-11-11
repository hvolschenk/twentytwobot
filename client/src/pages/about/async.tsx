import React from 'react';

const AboutLazy = React.lazy(() => import('./index'));

const AboutAsync: React.FC = () => (
  <React.Suspense fallback={<p>Loading about page</p>}>
    <AboutLazy />
  </React.Suspense>
);

export default AboutAsync;
