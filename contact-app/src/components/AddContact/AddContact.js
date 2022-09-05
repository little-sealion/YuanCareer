import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useContactsCrud } from "../../context/ContactsCrudContext";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const AddContact = () => {
  const[title, setTitle] =useState("");
  const[instruction, setInstruction] = useState("");
  const[image, setImage] = useState("");
  const {addContactHandler} = useContactsCrud();
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (title === "" || instruction === "" ) {
      alert("Please fill in all fields to continue.");
        return;
      }

     addContactHandler({title, instruction});
     setTitle("");
     setInstruction("");
     setImage("");
     navigate("/");
  };
  
  return (
    <Box
    component="form"
    noValidate
    autoComplete="off"
    onSubmit={add} 
  >
      <h2>Add Item</h2>

        <div className="field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle( e.target.value )}
          />
        </div>
        <TextField
          fullWidth 
          variant="filled" 
          label="Instruction"
          multiline
          maxRows={4}
          margin="normal"
          value={instruction}
          onChange={(e) => setInstruction( e.target.value )}
        />
        <div className="field">
          <label>Image</label>
          <input
            type="file"
            name="image"
            placeholder="Image"
            value={image}
            onChange={(e) => setImage( e.target.value )}
          />
        </div>
        <button className="ui button teal ">Add</button>
    </Box>
  );
}


export default AddContact;
