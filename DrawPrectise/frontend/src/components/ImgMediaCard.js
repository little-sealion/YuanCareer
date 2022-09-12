import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

export default function ImgMediaCard(props) {
  const { Title, Category, Detail, Count, ImageUrl } = props.item;
  let details = Object.values(JSON.parse(Detail));
  // console.log(details.filter(detail => detail.imgName === ImageUrl));
  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          alt={ImageUrl}
          height="140"
          image={require(`../uploads/${Title}/${ImageUrl}`)}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {Title}
          </Typography>
          <Typography gutterBottom variant="body1" component="div">
            Category:{Category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {details.filter(detail => detail.imgName === ImageUrl).imgDetail}
          </Typography>
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2}>
            <Typography variant="body2" color="text.secondary">
              <strong>Practised</strong>:{Count}
            </Typography>
            <Link to={`/edit`} state={{ item: props.item }}>
              <i
                className="edit alternate outline icon"
                style={{ color: 'teal', float: 'right' }}
              ></i>
            </Link>
          </Stack>
        </CardActions>
      </Card>
    </Grid>
  );
}
