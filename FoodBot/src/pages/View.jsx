import React, { useState, useEffect } from 'react';
import axios from 'axios';

const View = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Define a function to fetch menu items from the backend
    const fetchMenuItems = async () => {
      try {
        // Make an HTTP GET request to your backend endpoint
        const response = await axios.get('http://localhost:3000/menuview'); // Replace '/api/menu' with your actual endpoint
        // Set the menu items received from the backend response
        setMenuItems(response.data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    // Call the fetchMenuItems function to fetch menu items when the component mounts
    fetchMenuItems();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">View Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">{item.itemName}</h3>
            <p className="text-gray-700 mb-4">{item.description}</p>
            <p className="text-lg font-bold">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default View;
