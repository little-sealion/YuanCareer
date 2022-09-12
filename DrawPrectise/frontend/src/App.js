import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import EditItem from './components/EditItem';
import { ItemsCrudContextProvider } from './context/ItemsCrudContext';

import './App.css';

function App() {
  return (
    <div>
      <div
        style={{
          padding: ' 16px 32px 16px 32px',
          width: '100%',
          height: '100%',
        }}
      >
        <Router>
          <Header />
          <ItemsCrudContextProvider>
            <Routes>
              <Route path="/" element={<ItemList />} />
              <Route path="/add" element={<AddItem />} />
              <Route path="/edit" element={<EditItem />} />
            </Routes>
          </ItemsCrudContextProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;
