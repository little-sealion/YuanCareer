import React from 'react';
import { useItemsCrud } from '../../../context/ItemsCrudContext';

// - input form
// - search the ContactItem by ContactItemContent
// - background-color change by on-click

const SearchBar = () => {
  const { searchTerm, searchHandler } = useItemsCrud();

  const onUserSearch = (e) => {
    searchHandler(e.target.value);
  };

  return (
    <div className="ui search">
      <div className="ui icon input">
        <input
          type="text"
          placeholder="Search items"
          className="prompt"
          value={searchTerm}
          onChange={(e) => onUserSearch(e)}
        />
        <i aria-hidden="true" className="search circular link icon"></i>
      </div>
    </div>
  );
};

export default SearchBar;
