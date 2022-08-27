import {createContext, useContext, useState} from "react";
import api from '../api/contacts';
import { v4 as uuid } from 'uuid';


const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({children}) {
   const [contacts, setContacts] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [searchResults, setSearchResults] =useState([]);

//RetrieveContacts
const retriveContacts = async() => {
  const response = await api.get("/contacts");
  if(response.data) setContacts(response.data);
};

//AddContact
const addContactHandler = async (contact) => {
  const request= {
    id: uuid(),
    ...contact,
  };

const response = await api.post("/contacts", request)

setContacts([...contacts, response.data]);
};

//Edit and update Contact
const updateContactHandler = async (contact) => {
  const response = await api.put(`/contacts/${contact.id}`, contact)
  const { id } = response.data;
  setContacts(
    contacts.map((contact) => {
      return contact.id === id ? { ...response.data } : contact;
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


// SearchBar - searchFunctionality
const searchHandler = (searchTerm) => {
  setSearchTerm(searchTerm);
  if(searchTerm !== ""){
   const newContactList = contacts.filter((contact) => {
     return Object.values(contact)
      .join("")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
   });
   setSearchTerm(newContactList);
  }else{
   setSearchTerm(contacts);
  }
};

    const value = {
        contacts,
        searchTerm,
        searchResults,
        searchHandler,
        retriveContacts,
        addContactHandler,
        updateContactHandler,
        removeContactHandler,
    }

  return <contactsCrudContext.Provider value = {value}>
    {children}
  </contactsCrudContext.Provider>

}

export function useContactsCrud() {
    return useContext(contactsCrudContext);
}
