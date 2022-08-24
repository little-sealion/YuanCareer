import React from 'react';
import { Link } from "react-router-dom";
import ContactCard from './components/ContactCard/ContactCard';
import SearchBar from './components/SearchBar/SearchBar';

const ContactList = (props) => {

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
    <div className="main"> 
    <h2>
      Contact list
      <Link to="/add" >
        <button className="ui button right teal ">Add Contact</button>
      </Link>
    </h2>
    <SearchBar 
      term={props.term} 
      searchKeyword={props.searchKeyword} 
     />
      <div className="ui celled list">
          {renderContactList.length > 0 ? renderContactList : "no contacts available"}
        </div>
        </div>

  )
}

export default ContactList