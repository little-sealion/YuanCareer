import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useItemsCrud } from '../context/ItemsCrudContext';
import SearchBar from './SearchBar';
import ImgMediaCard from './ImgMediaCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ItemList = () => {
  const { retrieveItems, searchTerm, items, searchResults } = useItemsCrud();

  useEffect(() => {
    retrieveItems();
  }, [retrieveItems]);

  const renderItemList = (searchTerm.length < 1 ? items : searchResults)
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

      <div >
        {renderItemList.length > 0 ? (
          <Grid  container spacing={2}>
            {renderItemList}
          </Grid>
        ) : (
          'No Items available'
        )}
      </div>
    </div>
  );
};

export default ItemList;
