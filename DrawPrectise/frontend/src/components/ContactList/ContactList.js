import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useItemsCrud } from '../../context/ItemsCrudContext';
import SearchBar from './components/SearchBar';
import ImgMediaCard from './components/ImgMediaCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ContactList = () => {
  const { retrieveItems, searchTerm, items, searchResults } = useItemsCrud();

  useEffect(() => {
    retrieveItems();
  }, []);

  const renderContactList = (searchTerm.length < 1 ? items : searchResults)
    .sort(function (a, b) {
      return a.Count - b.Count;
    })
    .slice(0, 20)
    .map((item) => {
      return <ImgMediaCard item={item} key={item.Id} />;
    });

  return (
    <div className="main">
      <Box
        m={1}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <SearchBar />
        <Link to="/add">
          <Button variant="contained">Add Item</Button>
        </Link>
      </Box>

      <div className="ui celled list">
        {renderContactList.length > 0 ? (
          <Grid sx={{ flexGrow: 1 }} container spacing={5}>
            {renderContactList}
          </Grid>
        ) : (
          'No Items available'
        )}
      </div>
    </div>
  );
};

export default ContactList;
