import React, { useState } from 'react';
import { useMenu } from '../context/MenuContext';

const Add = () => {
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const { addItem } = useMenu();

  // Mock function to simulate adding an item
  const addItemToList = (e) => {
    e.preventDefault(); // Prevent form default submission behavior
    addItem({ itemName, itemDescription, itemPrice });
    console.log(`Adding Item: ${itemName}, Description: ${itemDescription}, Price: ${itemPrice}`);
    // Here you would typically send this data to your backend server to add to the database
    
    // Reset the form fields
    setItemName('');
    setItemDescription('');
    setItemPrice('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Add New Item</h2>
      <form onSubmit={addItemToList} className="space-y-4">
        <div>
          <label htmlFor="itemName" className="block">Item Name:</label>
          <input
            id="itemName"
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <label htmlFor="itemDescription" className="block">Description:</label>
          <textarea
            id="itemDescription"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
            className="textarea"
          ></textarea>
        </div>
        <div>
          <label htmlFor="itemPrice" className="block">Price ($):</label>
          <input
            id="itemPrice"
            type="number"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="btn">Add Item</button>
      </form>
    </div>
  );
};

export default Add;
