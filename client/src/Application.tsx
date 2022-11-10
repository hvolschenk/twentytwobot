import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import About from './pages/about/async';
import Home from './pages/home/async';

const Application: React.FC = () => (
  <BrowserRouter>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
    <Routes>
      <Route element={<About />} path="/about" />
      <Route element={<Home />} path="/" />
    </Routes>
  </BrowserRouter>
);

export default Application;
