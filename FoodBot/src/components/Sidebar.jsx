// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // Function to determine the style of each NavLink
  const getNavLinkClass = ({ isActive }) => {
    return `block text-lg px-4 py-3 rounded hover:bg-purple-700 ${
      isActive ? 'bg-purple-600 text-white' : 'text-purple-200'
    }`;
  };

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white h-full"> {/* Full height and new colors */}
      <div className="flex flex-col justify-between h-full"> {/* Flex container for footer space */}
        <div>
          <div className="px-6 py-4">
            {/* Your brand or logo here */}
            <span className="text-2xl font-bold text-purple-300">FoodBot</span>
          </div>
          <nav className="mt-10">
            <NavLink to="/dashboard/overview" className={getNavLinkClass}>Overview</NavLink>
            <NavLink to="/dashboard/orders" className={getNavLinkClass}>Orders</NavLink>
            <NavLink to="/dashboard/menu" className={getNavLinkClass}>Menu</NavLink>
            <NavLink to="/dashboard/customers" className={getNavLinkClass}>Customers</NavLink>
            {/* More nav items */}
          </nav>
        </div>
        <div className="px-6 py-4">
          <span className="text-sm text-purple-300">Footer Content</span>
          {/* Additional footer content */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
