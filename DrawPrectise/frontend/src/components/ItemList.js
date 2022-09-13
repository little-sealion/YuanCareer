import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useItemsCrud } from '../context/ItemsCrudContext';
import ImgMediaCard from './ImgMediaCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const ItemList = () => {
  const { retrieveItems, searchTerm, items, searchResults } = useItemsCrud();

  useEffect(() => {
    retrieveItems();
  }, []);

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


      <div >
        {renderItemList.length > 0 ? (
          <Grid  container spacing={2} margin={2}>
            {renderItemList}
            <Box
        m={1}
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-end"
      >
        <Link to="/add">
          <Button variant="contained"><AddIcon /></Button>
        </Link>
      </Box>
          </Grid>
        ) : (
          'No Items available'
        )}
             
      </div>
    </div>
  );
};

export default ItemList;
