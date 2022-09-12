import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItemsCrud } from '../context/ItemsCrudContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const AddItem = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [details, setDetails] = useState([]);
  const [images,setImages] = useState([]);
  const [imageURLs,setImageURLs] = useState([]);
  const { addItemHandler } = useItemsCrud();
  const navigate = useNavigate();

  let categories = ['基础', '偷懒'];
 
  const onImageChange = e => {
    setImages([...e.target.files]);
  }
  const onAddImages = e => {
    setImages([...images,...e.target.files]);
  }
  const deleteImage = srcImg => {
    setImages(images.filter(image => image.name !== srcImg));
    setDetails(details.filter(detail => detail.imgName !== srcImg));
  }

 const filteredDetail = (imgName) => {
  return details.filter(detail => detail.imgName === imgName);
 }
  const onDetailChange = (imgName,imgDetail) => {
    let isExist = details.find(detail => {if(detail.imgName === imgName){return true;} return false;})
    if(isExist){
      setDetails(details.map(detail => {
        if(detail.imgName === imgName) return {...detail,imgDetail};
        return detail;
      }));
    }else{
    setDetails([...details,{imgName,imgDetail}]);
    }
  }
  
  const add = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title",title);
    formData.append("category",category);
    formData.append("detail",JSON.stringify(details));
    images.forEach(img => formData.append("files",img)); 
    addItemHandler(formData);
    setTitle('');
    setCategory('');
    navigate('/');
  };

  useEffect(() => {
    if(images.length < 1) return;
    const newImageUrls = [];
    images.forEach(image => newImageUrls.push(image.name+"@"+URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);
  

  return (
    <Box
      component="form"
      id="create-item-form"
      encType="multipart/form-data"
      autoComplete="off"
      margin="dense"
      onSubmit={add}
    >
      <TextField
        fullWidth
        label="Title"
        name="title"
        variant="filled"
        margin="dense"
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

      {images.length === 0 && <input        
        type="file"
        accept="image/*"
        name="files"
        placeholder="Image"
        multiple
        onChange={onImageChange}
      />}

      <Grid sx={{ flexGrow: 1 }} container spacing={5} margin={5}>
      {       
       imageURLs.map(srcImg => 
        <Grid item>
          <Button onClick={() => deleteImage(srcImg.substring(0,srcImg.indexOf('@')))}><HighlightOffIcon color='warning' fontSize='large'/></Button>
          
        <Card sx={{ maxWidth: 345 }}>
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
         onChange={(e) => onDetailChange(srcImg.substring(0,srcImg.indexOf('@')), e.target.value)}
       />
         </CardContent>
       </CardActionArea>
     </Card>
        </Grid>
 )}  
     {images.length > 0 && <Grid item>
      <input
    style={{ display: "none" }}
    id="contained-button-file"
    multiple
    type="file"
    accept="image/*"
    onChange={onAddImages}
  />
  <label htmlFor="contained-button-file">
    <Button variant="contained" color="primary" component="span" startIcon={<ImageIcon />}>
      Add more
    </Button>
  </label>
      </Grid>}
     
</Grid>
      
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button type="submit" variant="contained" >
          Add Item
        </Button>
      </Box>
    </Box>
  );
};

export default AddItem;
