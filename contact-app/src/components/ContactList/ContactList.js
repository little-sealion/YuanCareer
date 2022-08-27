import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useContactsCrud } from '../../context/ContactsCrudContext';
import ContactCard from './components/ContactCard/ContactCard';
import SearchBar from './components/SearchBar/SearchBar';

const ContactList = (props) => {
  const {contacts, retriveContacts, } = useContactsCrud();
  const {searchTerm, searchResults} = SearchBar();

  useEffect(() => {
    retriveContacts();
  },[]);

  const renderContactList = (searchTerm.length < 1 ? contacts: searchResults).map((contact) => {
     return ( 
     <ContactCard 
        contact={contact} 
        key={contact.id}
        />
      );
  });

  return (
    <div className="main"> 
    <h2>
      Contact list
      <Link to="/add" >
        <button className="ui button right teal ">Add Contact</button>
      </Link>
    </h2>
    <SearchBar />
      <div className="ui celled list">
          {renderContactList.length > 0 ? renderContactList : "no contacts available"}
        </div>
        </div>

  )
}

export default ContactList