import { createContext, useContext, useState } from 'react';
import api from '../api/items';

const itemsCrudContext = createContext();

export function ItemsCrudContextProvider({ children }) {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  //Retrieveitems
  const retrieveItems = async () => {
    const response = await api.get('api/items');
    if (response.data) {
      setItems(response.data);
    }
  };

  //Add Item
  const addItemHandler = async (formData) => {
    await api.post('api/items/create', formData);
  };

  //Edit and update Item
  const updateItemHandler = async (updateInfo) => {
    await api.post(`api/items/update`, updateInfo);
  };

  //Delete Item
  const removeItemHandler = async (id) => {
    await api.post(`api/items/delete`, { id });

    const newItemList = items.filter((item) => {
      return item.id !== id;
    });

    setItems(newItemList);
  };

  // SearchBar - searchFunctionality
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== '') {
      const newItemList = items.filter((item) => {
        return Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newItemList);
    } else {
      setSearchResults(items);
    }
  };

  const value = {
    items,
    searchTerm,
    searchResults,
    searchHandler,
    retrieveItems,
    addItemHandler,
    updateItemHandler,
    removeItemHandler,
  };

  return (
    <itemsCrudContext.Provider value={value}>
      {children}
    </itemsCrudContext.Provider>
  );
}

export function useItemsCrud() {
  return useContext(itemsCrudContext);
}
