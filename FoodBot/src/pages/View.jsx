// View.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';

const View = () => {
  const { menuItems } = useMenu();

  return (
    <div>
      <h2 className="text-2xl font-bold">View Items</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.id}>
            <h3>{item.itemName}</h3>
            <p>{item.itemDescription}</p>
            <p>${item.itemPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default View;
