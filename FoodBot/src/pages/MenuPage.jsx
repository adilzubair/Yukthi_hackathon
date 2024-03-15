import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet

const MenuPage = () => {
  // Use Outlet to render child routes
  return (
    <div>
      <h2>Menu Page Content</h2>
      <Outlet /> {/* Child routes (View, Add, Edit) are rendered here */}
    </div>
  );
};

export default MenuPage;
