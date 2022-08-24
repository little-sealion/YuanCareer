import React, { useState, useEffect } from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import api from '../src/api/contacts';

import Header from './components/Header';
import AddContact from './components/AddContact/AddContact'
import ContactList from './components/ContactList';
import EditContact from './components/EditContact/EditContact';

import './App.css';

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] =useState([]);

//RetrieveContacts
const retriveContacts = async() => {
  const response = await api.get("/contacts");
  return response.data;
};

//AddContact
const addContactHandler = async (contact) => {
    const request= {
      id: uuid(),
      ...contact,
    };
 
  const response = await api.post("/contacts", request)

  setContacts([...contacts, response.data]);
};

//Edit and update Contact
const updateContactHandler = async (contact) => {
  const response = await api.put(`/contacts/${contact.id}`, contact)

  const { id } = response.data;

  setContacts(
    contacts.map((contact) => {
      return contact.id === id ? { ...response.data } : contact;
    })
  );
};

//DeleteContact
const removeContactHandler = async (id) => {
  await api.delete(`/contacts/${id}`);

   const newContactList = contacts.filter((contact) => {
    return contact.id !== id;
   });

   setContacts(newContactList);
}

// SearchBar - search functionality
const searchHandler = (searchTerm) => {
   setSearchTerm(searchTerm);
   if(searchTerm !== ""){
    const newContactList = contacts.filter((contact) => {
      return Object.values(contact).join("").toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchTerm(newContactList);
   }else{
    setSearchTerm(contacts);
   }
}

useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
  const getAllContacts = async () => {
    const allContacts = await retriveContacts();
    if( allContacts ) setContacts(allContacts);
  }
    getAllContacts();
}, []);
   

useEffect(() => {
//  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
}, [contacts]);

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
        <BrowserRouter>
          <Header />
          <Routes>
              <Route 
                path="/" 
                element={
                <ContactList 
                  contacts={searchTerm.length < 1 ? contacts : searchResults } 
                  getContactId={removeContactHandler}
                  term={searchTerm}
                  searchKeyword = {searchHandler}
                />
               } 
               />
              <Route 
                path="/add" 
                element={
                <AddContact addContactHandler={addContactHandler}/>
              }/>
              <Route 
                path="/edit" 
                element={
                <EditContact updateContactHandler={updateContactHandler}/>
              }/>

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
