import React from 'react';
import { Link } from "react-router-dom";
import ContactCard from '../ContactCard/ContactCard';

const ContactList = (props) => {
  console.log(props);

  const deleteContactHandler= (id) => {
     props.getContactId(id);
  }

  // const contacts = [
  //   {
  //     id: "1",
  //     name: "Dipesh",
  //     mobile: "0452321523",
  //     email: "dipesh@gmail.com"
  //   },
  // ];

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
      <div className="ui celled list">
          {renderContactList}
        </div>
        </div>

  )
}

export default ContactList