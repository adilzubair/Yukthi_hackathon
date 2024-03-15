import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [isMenuDropdownOpen, setIsMenuDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Function to determine the style of each NavLink
  const getNavLinkClass = ({ isActive }) => {
    return `block text-lg px-4 py-3 rounded hover:bg-orange-700 ${
      isActive ? 'bg-orange-600 text-white' : 'text-orange-200'
    }`;
  };

  // Toggle dropdown visibility
  const toggleMenuDropdown = () => {
    setIsMenuDropdownOpen(!isMenuDropdownOpen);
  };

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white h-full">
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="px-6 py-4">
            <span className="text-2xl font-bold text-orange-300">FoodBot</span>
          </div>
          <nav className="mt-10">
            <NavLink to="/dashboard/overview" className={getNavLinkClass}>Overview</NavLink>
            <NavLink to="/dashboard/orders" className={getNavLinkClass}>Orders</NavLink>
            <div>
              {/* Modified Menu NavLink to a div for click handling */}
              <div
                onClick={toggleMenuDropdown}
                className={getNavLinkClass({ isActive: false }).replace('block', '') + ' cursor-pointer'}
              >
                Menu
              </div>
              {/* Conditional rendering for Dropdown */}
              {isMenuDropdownOpen && (
                <div className="pl-4">
                  <NavLink to="/dashboard/menu/View" className={getNavLinkClass}>View</NavLink>
                  <NavLink to="/dashboard/menu/Add" className={getNavLinkClass}>Add</NavLink>
                  <NavLink to="/dashboard/menu/Edit" className={getNavLinkClass}>Edit</NavLink>
                  {/* Add more dropdown items here */}
                </div>
              )}
            </div>
            <NavLink to="/dashboard/customers" className={getNavLinkClass}>Customers</NavLink>
            {/* More nav items */}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
