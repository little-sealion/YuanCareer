import React from 'react';
import { Link } from "react-router-dom";
import ContactCard from './components/ContactCard/ContactCard';
import SearchBar from './components/SearchBar/SearchBar';

const ContactList = (props) => {
  console.log(props);

  const deleteContactHandler= (id) => {
     props.getContactId(id);
  }

  const renderContactList = props.contacts.map((contact) => {
     return ( 
     <ContactCard 
        contact={contact} 
        clickHandler={deleteContactHandler} 
        key={contact.id}
        />
      );
  });

  return (
    <div class="main"> 
    <h2>
      Contact list
      <Link to="/add">
        <button class="ui button teal right  ">Add Contact</button>
      </Link>
    </h2>
    <SearchBar />
      <div className="ui celled list">
          {renderContactList}
        </div>
        </div>

  )
}

export default ContactList