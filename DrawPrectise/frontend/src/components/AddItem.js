import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useItemsCrud } from '../context/ItemsCrudContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

const AddItem = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [detail, setDetail] = useState('');
  const { addItemHandler } = useItemsCrud();
  const navigate = useNavigate();

  let categories = ['基础', '偷懒'];
  // render image when input[type=file] field has select an image
  const loadImage = (input) => {
    // get the image element
    const imageElem = document.getElementById('avatar-image');
    if (input.files && input.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(input.files[0]);
      reader.onload = function (e) {
        imageElem.src = e.target.result;
        imageElem.style.opacity = '1';
      };
    }
    // display the image element
    imageElem.style.display = 'block';
  };

  const add = (e) => {
    e.preventDefault();
    const createItemForm = document.getElementById('create-item-form');
    let formData = new FormData(createItemForm);
    addItemHandler(formData);
    setTitle('');
    setCategory('');
    navigate('/');
  };

  return (
    <Box
      component="form"
      id="create-item-form"
      encType="multipart/form-data"
      autoComplete="off"
      margin={5}
      onSubmit={add}
    >
      <TextField
        fullWidth
        label="Title"
        name="title"
        variant="filled"
        margin="5"
        required
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

      <TextField
        fullWidth
        variant="filled"
        label="Detail"
        name="detail"
        multiline
        maxRows={4}
        margin="normal"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      />

      <TextField
        accept="image/*"
        type="file"
        name="coverImagePath"
        placeholder="Image"
        onInput={(e) => loadImage(e.target)}
      />
      <img
        id="avatar-image"
        src={''}
        alt={title}
        loading="lazy"
        style={{ maxWidth: '600px', width: '100%' }}
      />
      <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
        <Button type="submit" variant="contained">
          Add Item
        </Button>
      </Box>
    </Box>
  );
};

export default AddItem;
