import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useContactsCrud } from '../../context/ContactsCrudContext';
import SearchBar from './components/SearchBar/SearchBar';
import RenderContactList from './components/RenderContactList/RenderContactList';

const ContactList = () => {
  const {retriveContacts } = useContactsCrud();

  useEffect(() => {
    retriveContacts();
  },[]);

  return (
    <div className="main"> 
    <h2>
      Contact list
      <Link to="/add" >
        <button className="ui button teal " style={{float: "right"}}>Add Contact</button>
      </Link>
    </h2>
    <SearchBar />
    <RenderContactList />
    </div>
  );
};

export default ContactList;