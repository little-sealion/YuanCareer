import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditContact = ({updateContactHandler, }) => {
  const location = useLocation();
  const {id, name, mobile, email} =location.state.contact;

  const[newName, setNewName] =useState(name);
  const[newMobile, setNewMobile] = useState(mobile);
  const[newEmail, setNewEmail] = useState(email);
  const navigate = useNavigate();

  const update = (e) => {
    e.preventDefault();
    if (newName === "" || newMobile === "" || newEmail === "") {
      alert("ALl the fields are mandatory!");
        return;
      }

     updateContactHandler({id, newName, newMobile, newEmail});
     setNewName("");
     setNewMobile("");
     setNewEmail("");
     navigate("/");
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}  >
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName( e.target.value )}
          />
        </div>
        <div className="field">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={newMobile}
            onChange={(e) => setNewMobile( e.target.value )}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail( e.target.value )}
          />
        </div>
        <button className="ui button teal">Update</button>
      </form>
    </div>
  );
}

export default EditContact