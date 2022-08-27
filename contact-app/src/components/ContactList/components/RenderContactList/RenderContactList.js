import React from 'react';
import { useContactsCrud } from '../../../../context/ContactsCrudContext';
import ContactCard from './components/ContactCard';
const RenderContactList = () => {

const {contacts, searchHandler, searchTerm } = useContactsCrud();

    const renderNewContactList = (searchTerm.length < 1 ? contacts: searchHandler).map((contact) => {
    return ( 
    <ContactCard 
        contact={contact} 
        key={contact.id}
        />
        );
    });

return (
    <div className="ui celled list">
    {renderNewContactList.length > 0 ? renderNewContactList : "No contacts available"}
    </div>
    )
}



export default RenderContactList