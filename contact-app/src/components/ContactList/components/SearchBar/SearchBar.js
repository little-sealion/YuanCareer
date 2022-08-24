import React from 'react';
import { useRef } from 'react';

// - input form
// - search the ContactItem by ContactItemContent
// - background-color change by on-click

const SearchBar = (term, searchKeyword) => {
  const inputEl = useRef("");

  const getSearchTerm = () => {
    searchKeyword(inputEl.current.value);
  };

  return (
    <div className="ui search"> 
    <div class="ui icon input">
      <input 
        ref={inputEl}
        type="text" 
        placeholder="Search..."/>
      <i 
        aria-hidden="true" 
        className="search circular link icon"
        value={term}
        onChange={getSearchTerm}
        >  
      </i>
    </div>
   </div>
  )
}

export default SearchBar