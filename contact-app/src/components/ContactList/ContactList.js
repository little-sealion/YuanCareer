import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useContactsCrud } from '../../context/ContactsCrudContext';
import SearchBar from './components/SearchBar/SearchBar';
import ContactCard from './components/ContactCard/ContactCard';

const ContactList = () => {
  const {retrieveContacts, searchTerm, contacts, searchResults } = useContactsCrud();

  useEffect(() => {
    retrieveContacts();
  }, []);

  const renderContactList = (searchTerm.length < 1 ? contacts : searchResults).map((contact) => {
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
        <button className="ui button teal " style={{float: "right"}}>Add Contact</button>
      </Link>
    </h2>
    <SearchBar />
    <div className="ui celled list">
        {renderContactList.length > 0
          ? renderContactList
          : "No Contacts available"}
      </div>
    </div>
  );
};

export default ContactList;