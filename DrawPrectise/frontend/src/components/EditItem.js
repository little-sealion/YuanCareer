import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useItemsCrud } from '../context/ItemsCrudContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Alert, CardActionArea } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useNavigate } from 'react-router-dom';


const EditItem = () => {
  const location = useLocation();
  const { Id, Title, Category, Detail, Count } = location.state.item;
  const [count, setCount] = useState(Count);
  const { updateItemCountHandler ,updateItemHandler} = useItemsCrud();
  const [title, setTitle] = useState(Title);
  const [category, setCategory] = useState(Category);
  const [details, setDetails] = useState(Object.values(JSON.parse(Detail)));
  const [images,setImages] = useState([]);
  const [imageURLs,setImageURLs] = useState([]);
  const [addedDetails, setAddedDetails] = useState([]);

  const onAddImages = e => {
    setImages([...images,...e.target.files]);
    setAddedDetails([...addedDetails,{imgName:e.target.files[0].name,imgDetail:""}]);
  }
  let categories = ['基础', '偷懒'];
  const navigate = useNavigate();
  const addOne = async (e) => {
    e.preventDefault();

    await updateItemCountHandler({
      id: Id,
      count: count + 1,
    });
    alert("successfully updated count");
    setCount(count + 1);
  };

  console.log("details",details);
  console.log("addedDetails",addedDetails)
  const sumUpDetails = [...details,...addedDetails];
console.log("totalDetails",sumUpDetails)


  const update = async (e) => {

    e.preventDefault();
    let formData = new FormData();
    const sumUpDetails = [...details,...addedDetails];

    formData.append("id",Id);
    formData.append("title",title);
    formData.append("category",category);
    formData.append("imageUrl",sumUpDetails[0]?.imgName??"")
    formData.append("detail",JSON.stringify(sumUpDetails));
    formData.append("count",count);
    images.forEach(img => formData.append("files",img)); 
    await updateItemHandler(formData);

    setTitle('');
    setCategory('');
    navigate('/');
  };

  const deleteImage = srcImg => {
    setImages(images.filter(image => image.name !== srcImg));
    setAddedDetails(addedDetails.filter(detail => detail.imgName !== srcImg));
  }
  const deleteExistingImage = srcImg => {
    setDetails(details.filter(detail => detail.imgName !== srcImg));
  }
  const filteredDetail = (imgName) => {
    return details.filter(detail => detail.imgName === imgName);
   }
    const onDetailChange = (imgName,imgDetail) => {
        setDetails(details.map(detail => {
          if(detail.imgName === imgName) return {...detail,imgDetail};
          return detail;
        }));
 
    }
    const onAddedDetailChange = (imgName,imgDetail) => {
        setAddedDetails(addedDetails.map(detail => {
          if(detail.imgName === imgName) return {...detail,imgDetail};
          return detail;
        }));
    }

    useEffect(() => {
      // if(images.length < 1) return;
      const newImageUrls = [];
      images.forEach(image => newImageUrls.push(image.name+"@"+URL.createObjectURL(image)));
      setImageURLs(newImageUrls);
    }, [images]);

  return (
    <Box       component="form"
    id="create-item-form"
    encType="multipart/form-data"
    autoComplete="off"
    margin="dense"
    onSubmit={update} >
    <TextField
        fullWidth
        label="Title"
        name="title"
        variant="filled"
        margin="dense"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      /> 
       <FormControl fullWidth>
        <InputLabel id="category-select">Category</InputLabel>
        <Select
          labelId="category-select"
          id="demo-simple-select"
          name="category"
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((catg) => (
            <MenuItem value={catg}>{catg}</MenuItem>
          ))}
        </Select>
      </FormControl>     
      <Typography variant="body2" color="text.secondary" >
          <strong>Practised</strong>:{count}
      </Typography>
      <Button
        type="submit"
        variant="contained"
        onClick={(e) => addOne(e)}
      >
        +1
      </Button>

      <Grid sx={{ flexGrow: 1 }} container spacing={5} margin={5}>
      {       
       details.map(detail => 

        <Grid item key={detail.imgName}>
          <Button onClick={() => deleteExistingImage(detail.imgName)}><HighlightOffIcon color='warning' fontSize='large'/></Button>
          
        <Card sx={{ maxWidth: 345 }}  >
       <CardActionArea>
         <CardMedia
           component="img"
           height="200"
           width="200"
           image={require(`../uploads/${Title}/${detail.imgName}`)}
           alt={title}
         />
         <CardContent>
         <TextField
         fullWidth
         variant="filled"
         label="Detail"
         multiline
         maxRows={4}
         margin="normal"
         value={detail.imgDetail}
         onChange={(e) => onDetailChange(detail.imgName,e.target.value)}
       />
         </CardContent>
       </CardActionArea>
     </Card>
        </Grid>
 )
} 
      {       
       imageURLs.map(srcImg => 
        <Grid item >
          <Button onClick={() => deleteImage(srcImg.substring(0,srcImg.indexOf('@')))}><HighlightOffIcon color='warning' fontSize='large'/></Button>
          
        <Card>
       <CardActionArea>
         <CardMedia
           component="img"
           height="140"
           width="140"
           image={srcImg.substring(srcImg.indexOf('@') + 1)}
           alt={title}
         />
         <CardContent>
         <TextField
         fullWidth
         variant="filled"
         label="Detail"
         name="detail"
         multiline
         maxRows={4}
         margin="normal"
         value={filteredDetail(srcImg.substring(0,srcImg.indexOf('@'))) === undefined? "":filteredDetail(srcImg.substring(0,srcImg.indexOf('@'))).imgDetail}
         onChange={(e) => onAddedDetailChange(srcImg.substring(0,srcImg.indexOf('@')), e.target.value)}
       />
         </CardContent>
       </CardActionArea>
     </Card>
        </Grid>
 )}  
      <Grid item>
      <input
    style={{ display: "none" }}
    id="contained-button-file"
    type="file"
    accept="image/*"
    onChange={(e) => onAddImages(e)}
  />
  <label htmlFor="contained-button-file">
    <Button variant="contained" color="primary" component="span" startIcon={<ImageIcon />}>
      Add more
    </Button>
  </label>
      </Grid>
     
</Grid>
      <Button
          type="submit"
          variant="contained"
          style={{float:"right"}}
        >
          Update
      </Button>
    </Box>
  );
};

export default EditItem;
