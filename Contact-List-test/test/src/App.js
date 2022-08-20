import React, { useState, useEffect } from 'react';
import {uuid} from 'react-uuid';
import styled from 'styled-components';
import './App.css';
import Header from './components/Header';
import AddContact from './components/AddContact/AddContact'
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar'

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
  const[loading, setLoading] = useState(true);

const addContactHandler = (contact) => {
  console.log(contact);
  setContacts([...contacts, { id: uuid(), ...contacts }]);
};

// const removeContactHandler = () => {

// }

useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
}, []);

useEffect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  setLoading(false);
}, [contacts]);

if(loading) {
  return (<div>Loading...</div>)
}

  return (
    <Wrapper>
      <Container>
          <Header />
          <AddContact addContactHandler={addContactHandler}/>
          <SearchBar />
          <ContactList contacts={contacts}/>
      </Container>
    </Wrapper>
  );
}

export default App;
