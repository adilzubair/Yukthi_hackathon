import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  // Function to determine the style of each NavLink
  const getNavLinkClass = ({ isActive }) => {
    return isActive
      ? "text-white bg-gray-700"
      : "text-gray-300 hover:bg-gray-700 hover:text-white";
  };

  return (
    <div className="h-full w-64 bg-gray-900 text-white flex flex-col">
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard/overview"
              className={getNavLinkClass}
              end
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/orders"
              className={getNavLinkClass}
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/menu"
              className={getNavLinkClass}
            >
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/customers"
              className={getNavLinkClass}
            >
              Customers
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="px-4 py-2 mt-6">
        Footer Content
      </div>
    </div>
  );
};

export default Sidebar;
