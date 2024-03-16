// DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100"> {/* Ensure full viewport height */}
      <Sidebar />
      <div className="flex-1 p-10 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
