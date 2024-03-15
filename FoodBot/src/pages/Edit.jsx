import React, { useState, useEffect } from 'react';
import { useMenu } from '../context/MenuContext';

const Edit = () => {
  const { menuItems, editItem } = useMenu();
  const [edits, setEdits] = useState({});

  // Initialize or reset edits state whenever menuItems change
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
    e.preventDefault(); // Prevent the form from causing a page reload
    Object.keys(edits).forEach(id => {
      editItem(Number(id), edits[id]);
    });
    // Optionally, navigate away or provide feedback after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold">Edit Menu Items</h2>
      {Object.values(edits).map((item) => (
        <div key={item.id} className="mb-4">
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={item.itemName}
              onChange={(e) => handleChange(item.id, 'itemName', e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={item.itemDescription}
              onChange={(e) => handleChange(item.id, 'itemDescription', e.target.value)}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={item.itemPrice}
              onChange={(e) => handleChange(item.id, 'itemPrice', e.target.value)}
            />
          </div>
        </div>
      ))}
      <button type="submit" className="mt-2">Submit All Changes</button>
    </form>
  );
};

export default Edit;
