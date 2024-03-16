import React, { useState, useEffect } from 'react';
import { useMenu } from '../context/MenuContext';

const Edit = () => {
  const { menuItems, editItem } = useMenu();
  const [edits, setEdits] = useState({});

  useEffect(() => {
    const initialEdits = menuItems.reduce((acc, item) => ({
      ...acc,
      [item.id]: { ...item }
    }), {});
    setEdits(initialEdits);
  }, [menuItems]);

  const handleChange = (id, field, value) => {
    setEdits(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.keys(edits).forEach(id => {
      editItem(Number(id), edits[id]);
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Menu Items</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.values(edits).map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name:</label>
              <input
                type="text"
                value={item.itemName}
                onChange={(e) => handleChange(item.id, 'itemName', e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description:</label>
              <input
                type="text"
                value={item.itemDescription}
                onChange={(e) => handleChange(item.id, 'itemDescription', e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price:</label>
              <input
                type="number"
                value={item.itemPrice}
                onChange={(e) => handleChange(item.id, 'itemPrice', e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        ))}
        <button type="submit" className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
          Submit All Changes
        </button>
      </form>
    </div>
  );
};

export default Edit;
