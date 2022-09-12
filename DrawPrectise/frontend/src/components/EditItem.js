import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useItemsCrud } from '../context/ItemsCrudContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';


const EditItem = () => {
  const location = useLocation();
  const { Id, Title, Category, Detail, Count } = location.state.item;
  const [count, setCount] = useState(Count);
  const { updateItemHandler } = useItemsCrud();

  const addOne = async (e) => {
    e.preventDefault();

    await updateItemHandler({
      id: Id,
      count: count + 1,
    });
    alert("successfully updated count");
    setCount(count + 1);
  };
 
  let details = Object.values(JSON.parse(Detail));

  return (
    <Box sx={{ width: "80%", height:"80%" }}>
      <h2>Title:{Title} </h2>   
      <h4>Category:{Category}   </h4>        
      <Typography variant="body2" color="text.secondary">
          <strong>Practised</strong>:{count}
      </Typography>

      <ImageList variant="masonry" cols={3} gap={8}>
        {details.map((detail) => (
          <ImageListItem key={detail.imgName}>
            <img
            width='400px'
            height="400px"
              src={require(`../uploads/${Title}/${detail.imgName}`)}
              srcSet={require(`../uploads/${Title}/${detail.imgName}`)}
              alt={detail.imgName}
              loading="lazy"
            />
            <ImageListItemBar position="below" title={detail.imgDetail} />
          </ImageListItem>
        ))}
      </ImageList>
      <Button
                  type="submit"
                  variant="contained"
                  onClick={(e) => addOne(e)}
                >
                  Add One
                </Button>
    </Box>
  );
};

export default EditItem;
