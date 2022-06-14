import React from 'react';
import { Outlet } from 'react-router-dom';
// components
import Header from './Header';

const PageLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default PageLayout