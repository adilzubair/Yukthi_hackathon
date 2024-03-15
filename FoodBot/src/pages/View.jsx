// View.jsx
import React from 'react';
import { useMenu } from '../context/MenuContext'; // Import the hook

const View = () => {
  const { menuItems } = useMenu(); // Use the context

  return (
    <div>
      <h2 className="text-2xl font-bold">View Items</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <h3 className="text-xl">{item.itemName}</h3>
            <p>{item.itemDescription}</p>
            <p>${item.itemPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default View;
