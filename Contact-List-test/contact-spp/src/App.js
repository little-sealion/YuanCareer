import React, { useState, useEffect } from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import api from '../src/api/contacts';

import Header from './components/Header';
import AddContact from './components/AddContact/AddContact'
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar'

import styled from 'styled-components';
import './App.css';

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
  // const[loading, setLoading] = useState(true);

  //RetrieveContacts
  


const addContactHandler = (contact) => {
  console.log(contact);
  setContacts([...contacts, { id: uuid(), ...contact }]);
};

const removeContactHandler = (id) => {
   const newContactList = contacts.filter((contact) => {
    return contact.id !== id;
   });

   setContacts(newContactList);
}

useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) setContacts(retriveContacts);
    

}, []);

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // setLoading(false);
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
                <ContactList contacts={contacts} getContactId={removeContactHandler}/>
               } 
               />
              <Route 
                path="/add" 
                element={
                <AddContact addContactHandler={addContactHandler}/>
              }/>
              {/* <EditContact /> */}
              {/* <SearchBar /> */}
          </Routes>
        </BrowserRouter>
      </Container>
    </Wrapper>
  );
}

export default App;
