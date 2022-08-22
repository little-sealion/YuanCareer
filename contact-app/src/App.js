import React, { useState, useEffect } from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import api from '../src/api/contacts';

import Header from './components/Header';
import AddContact from './components/AddContact/AddContact'
import ContactList from './components/ContactList';

import styled from 'styled-components';
import './App.css';
import EditContact from './components/EditContact/EditContact';

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  padding: 16px 32px 16px 32px;
  border-radius: 32px;
  overflow: auto;
  box-shadow: 0 0 16px rgb(0 0 0 / 50%);
  background-color: white;
  width: 800px;
`

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState();

//RetrieveContacts
const retriveContacts = async() => {
    const response = await api.get("/contacts");
    return response.data;
  }

//AddContact
const addContactHandler = async (contact) => {
    console.log(contact);
    const request= {
      id: uuid(),
      ...contact,
    }
 
  const response = await api.post("/contacts", request)
  console.log(response);
  setContacts([...contacts, response.data]);
};

//EditContact
const updateContactHandler = async (contact) => {
  const response = await api.put(`/contacts/${contact.id}`, contact)
  const { id } = response.data;
  setContacts(
    contacts.map((contact) => {
      return contact.id === id? {...response.data} : contact;
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

const searchHandler = (searchTerm) => {
   setSearchTerm(searchTerm);
   if(searchTerm !== ""){
    const newContactList = contacts.filter((contact) => {
      return 
    })
   }
}

useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
  const getAllContacts = async () => {
    const allContacts = await retriveContacts();
    if( allContacts ) setContacts= (allContacts);
  }
    getAllContacts();
}, []);
   

useEffect(() => {
  // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
}, [contacts]);

// if(loading) {
//   return (<div>Loading...</div>)
// }

  return (
    <Wrapper>
      <Container>
        <BrowserRouter>
          <Header />
          <Routes>
              <Route 
                path="/" 
                element={
                <ContactList 
                  contacts={contacts} getContactId={removeContactHandler}
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
      </Container>
    </Wrapper>
  );
}

export default App;
