import {createContext, useContext, useState} from "react";
import api from '../api/contacts';
import { v4 as uuid } from 'uuid';


const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({children}) {
   const [contacts, setContacts] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [searchResults, setSearchResults] =useState([]);

//RetrieveContacts
const retrieveContacts = async () => {
  const response = await api.get("/contacts.json");
  if (response.data) {
    setContacts(Object.entries(response.data));
  } 
};

//AddContact
const addContactHandler = async (contact) => {
  const request= {
    id: uuid(),
    ...contact,
  };

const response = await api.post("/contacts.json", request)

setContacts([...contacts, response.data]);
};

//Edit and update Contact
const updateContactHandler = async (contact) => {
  console.log(contact[0]);
  const response = await api.put(`/contacts/${contact[0]}.json`, contact)
  const { id } = response.data;
  let key = contact[0];
  let updatedContact =  [key,{ ...response.data }]
  setContacts(
    contacts.map((contact) => {
      return contact[1].id === id ?  updatedContact: contact;
    })
  );
};

//DeleteContact
const removeContactHandler = async (id) => {
  await api.delete(`/contacts/${id}.json`);

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
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
   });
   setSearchResults(newContactList);
  }else{
   setSearchResults(contacts);
  }
};

    const value = {
        contacts,
        searchTerm,
        searchResults,
        searchHandler,
        retrieveContacts,
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
