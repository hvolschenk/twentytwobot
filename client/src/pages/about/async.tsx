import React from 'react';

import About from './index';

const AboutAsync: React.FC = () => (
  <React.Suspense fallback={<p>Loading about page</p>}>
    <About />
  </React.Suspense>
);

export default AboutAsync;
