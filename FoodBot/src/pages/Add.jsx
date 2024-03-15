import React, { useState } from 'react';
import { useMenu } from '../context/MenuContext';
import axios from 'axios';

const Add = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const { addItem } = useMenu();

  const  addItemToList = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your backend endpoint (/menu) with the item data
      const description=itemDescription;
      const price=itemPrice;
      const response = await axios.post('https://localhost:3000/menu', {
        itemName,
        description,
        price
      });

    } catch (error) {
      console.error('Error adding item:', error);
    }

    addItem({ itemName, itemDescription, itemPrice });
    console.log(`Adding Item: ${itemName}, Description: ${itemDescription}, Price: ${itemPrice}`);
    setItemName('');
    setItemDescription('');
    setItemPrice('');
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Add New Item</h2>
      <div className="max-w-md mx-auto">
        <form onSubmit={addItemToList} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name:</label>
            <input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              id="itemDescription"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>
          <div>
            <label htmlFor="itemPrice" className="block text-sm font-medium text-gray-700">Price ($):</label>
            <input
              id="itemPrice"
              type="number"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
