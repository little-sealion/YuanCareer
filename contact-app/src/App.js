import React from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import AddContact from './components/AddContact/AddContact'
import ContactList from './components/ContactList';
import EditContact from './components/EditContact/EditContact';
import { ContactsCrudContextProvider } from './context/ContactsCrudContext';

import './App.css';

function App() {
  return (
    <div 
        style={{ 
        //   minHeight: "90%",
        // minWidth: "100%",
        // display: "flex",
        // justifyContent: "center",
        alignItems: "center", }}>
      <div 
          style={{ padding:" 16px 32px 16px 32px", 
          overflow: "auto",
          boxShadow: "0 0 16px rgb(0 0 0 / 50%)",
          backgroundColor:" white",
          width:"100%",
          height:"100%" }}>
        <Router>
          <Header />
          <ContactsCrudContextProvider>
          <Routes>
              <Route 
                path="/" 
                element={
                <ContactList />
               } 
               />
              <Route 
                path="/add" 
                element={
                <AddContact />
              }/>
              <Route 
                path="/edit" 
                element={
                <EditContact/>
              }/>
          </Routes>
          </ContactsCrudContextProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;
