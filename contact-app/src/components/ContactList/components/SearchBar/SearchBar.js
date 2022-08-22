import React from 'react'

// - input form
// - search the ContactItem by ContactItemContent
// - background-color change by on-click


const SearchBar = (props) => {
  const setSearchTerm = () => {
    
  }

  return (
    <div className="ui search"> 
    <div class="ui icon input">
      <input 
        type="text" 
        placeholder="Search..."/>
      <i 
        aria-hidden="true" 
        className="search circular link icon"
        value={props.term}
        onChange={(e) => setSearchTerm( e.target.value )}
        >  
      </i>
    </div>
   </div>
  )
}

export default SearchBar