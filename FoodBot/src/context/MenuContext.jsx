// MenuContext.js
import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState([]);

  const addItem = (item) => {
    setMenuItems((prevItems) => [...prevItems, item]);
  };

  return (
    <MenuContext.Provider value={{ menuItems, addItem }}>
      {children}
    </MenuContext.Provider>
  );
};
