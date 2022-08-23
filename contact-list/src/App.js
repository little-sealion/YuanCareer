import React, { useState } from 'react';
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
  const [contacts, setContacts] = useState();

//  const contacts = [
//   { 
//     id: "1",
//     name: "Alex",
//     mobile: "0426 256 254",
//     email: "alex@gmail.com"
//   },
//   { 
//     id: "2",
//     name: "Allen",
//     mobile: "0426 256 254",
//     email: "allen@gmail.com"
//   },
//   { 
//     id: "3",
//     name: "Bill",
//     mobile: "0426 256 254",
//     email: "bill@gmail.com"
//   },
//  ];

const addContactHandler = (contact) => {
  console.log(contact);
}

  return (
    <Wrapper>
      <Container>
          <Header />
          <AddContact addContactHandler= {addContactHandler}/>
          <SearchBar />
          <ContactList contacts={contacts}/>
      </Container>
    </Wrapper>
  );
}

export default App;
