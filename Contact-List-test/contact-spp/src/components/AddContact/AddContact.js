import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

const AddContact = ({addContactHandler,}) => {
  const[name, setName] =useState("");
  const[mobile, setMobile] = useState("");
  const[email, setEmail] = useState("");
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (name === "" || mobile === "" || email === "") {
      alert("ALl the fields are mandatory!");
        return;
      }

     addContactHandler({name, mobile, email});
     setName("");
     setMobile("");
     setEmail("");
     navigate("/");
  };
  
  return (
    <div className="ui main">
      <h2>Add Contact</h2>
      <form className="ui form" onSubmit={add}  >
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName( e.target.value )}
          />
        </div>
        <div className="field">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile( e.target.value )}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail( e.target.value )}
          />
        </div>
        <button className="ui button teal">Add</button>
      </form>
    </div>
  );
}


export default AddContact;
