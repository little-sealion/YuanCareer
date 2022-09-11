import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import AddItem from './components/AddItem';
import ContactList from './components/ContactList';
import EditItem from './components/EditItem';
import { ItemsCrudContextProvider } from './context/ItemsCrudContext';

import './App.css';

function App() {
  return (
    <div>
      <div
        style={{
          padding: ' 16px 32px 16px 32px',
          overflow: 'auto',
          boxShadow: '0 0 16px rgb(0 0 0 / 50%)',
          backgroundColor: ' white',
          width: '100%',
          height: '100%',
        }}
      >
        <Router>
          <Header />
          <ItemsCrudContextProvider>
            <Routes>
              <Route path="/" element={<ContactList />} />
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
