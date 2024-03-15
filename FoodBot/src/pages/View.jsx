import React from 'react';
import { useMenu } from '../context/MenuContext';

const View = () => {
  const { menuItems } = useMenu();

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">View Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-orange-600 mb-2">{item.itemName}</h3>
            <p className="text-gray-700 mb-4">{item.itemDescription}</p>
            <p className="text-lg font-bold">${item.itemPrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;
