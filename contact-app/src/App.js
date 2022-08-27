import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import AddContact from './components/AddContact/AddContact'
import ContactList from './components/ContactList';
import EditContact from './components/EditContact/EditContact';
import { ContactsCrudContextProvider } from './context/ContactsCrudContext';

import './App.css';

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";

// useEffect(() => {
//     // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
//     // if (retriveContacts) setContacts(retriveContacts);
//   const getAllContacts = async () => {
//     const allContacts = await retriveContacts();
//     if( allContacts ) setContacts(allContacts);
//   }
//     getAllContacts();
// }, []);
   

// useEffect(() => {
// //  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
// }, [contacts]);

  return (
    <div 
        style={{ minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", }}>
      <div 
          style={{ padding:" 16px 32px 16px 32px", 
          borderRadius: "32px",
          overflow: "auto",
          boxShadow: "0 0 16px rgb(0 0 0 / 50%)",
          backgroundColor:" white",
          width:" 800px", }}>
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
