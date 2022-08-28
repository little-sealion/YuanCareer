import React from 'react';
import { useContactsCrud } from '../../../../context/ContactsCrudContext';

// - input form
// - search the ContactItem by ContactItemContent
// - background-color change by on-click

const SearchBar = () => {
  const {searchTerm, searchHandler} = useContactsCrud();

  const onUserSearch = (e) => {
   searchHandler(e.target.value);
  }

  return (
    <div className="ui search"> 
    <div className="ui icon input">
      <input 
        type="text" 
        placeholder="Search contacts"
        className="prompt"
        value={searchTerm}
        onChange={(e) => onUserSearch(e)}
          />
      <i 
        aria-hidden="true" 
        className="search circular link icon"
        >  
      </i>
    </div>
   </div>
  )
}

export default SearchBar