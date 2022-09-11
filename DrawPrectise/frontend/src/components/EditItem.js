import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useItemsCrud } from '../context/ItemsCrudContext';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const EditItem = () => {
  const location = useLocation();
  const { Id, Title, Category, Detail, Count, ImageUrl } = location.state.item;
  const [count, setCount] = useState(Count);
  const { updateItemHandler } = useItemsCrud();

  const update = async (e) => {
    e.preventDefault();

    await updateItemHandler({
      id: Id,
      count: count + 1,
    });
    setCount(count + 1);
  };

  return (
    <Grid item xs={12}>
      <Card sx={{ maxWidth: 800 }}>
        <CardMedia
          component="img"
          alt={ImageUrl}
          height="100%"
          width="100%"
          image={require(`../../src/uploads/${ImageUrl}`)}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {Title}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            Category:{Category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Detail}
          </Typography>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2}>
            <Typography variant="body2" color="text.secondary">
              <strong>Practised: {count}</strong>
            </Typography>
            <Box
              m={10}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button
                type="submit"
                variant="contained"
                onClick={(e) => update(e)}
              >
                Update
              </Button>
            </Box>
          </Stack>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default EditItem;
