import {createContext, useContext} from "react";

const contactsCrudContext = createContext();

export function contactsCrudContextProvider({children}) {
   const [contacts, setContacts] = useState([]);
    const value = {
        contacts
    }

  return <contactsCrudContext.Provider value = {value}>
    {children}
  </contactsCrudContext.Provider>

}

export function useContactsCrud {
    return useContext(contactsCrudContext);
}
