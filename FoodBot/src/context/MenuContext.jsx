import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);

  const addItem = (item) => {
    const newItem = { ...item, id: Date.now() }; // Assign a unique ID to the new item
    setMenuItems((prevItems) => [...prevItems, newItem]); // Add the new item to the menuItems array
  };

  const editItem = (id, updatedItem) => {
    // Update the item with the given ID
    setMenuItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
  };

  const deleteItem = (id) => {
    // Filter out the item with the given ID
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/menuview');
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };
  return (
    <MenuContext.Provider value={{ menuItems, addItem, editItem, deleteItem }}>
      {children}
    </MenuContext.Provider>
  );
};
