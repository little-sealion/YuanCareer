import React, {useState} from "react";

// - Button with " ADD "
// - router/link to contactCard  

const AddContact = () => {
  const [currentState, setNewState] = useState()
  {
    todos:[
      {
       name: "",
       mobile: "",
       email: "",
      }
    ]
  };

const add = (e) => {
    e.preventDefault();
    if (currentState.name === "" || currentState.mobile === "" || currentState.email === "") {
      alert("ALl the fields are mandatory!");
      return;
    }
    this.props.addContactHandler(currentState);
    setNewState({ name: "", email: "" });
    this.props.history.push("/");
  }

    return (
      <div className="ui main">
        <h2>Add Contact</h2>
        <form className="ui form" onSubmit={add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={currentState.name}
              onChange={(e) => setNewState({ name: e.target.value })}
            />
         </div>
         <div className="field">
            <label>Mobile</label>
            <input 
              type="text" 
              name="moblie" 
              placeholder="Moblie"
              value={currentState.name}
              onChange = {(e) => setNewState({name: e.target.value })}
             />

          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={currentState.email}
              onChange={(e) => setNewState({ email: e.target.value })}
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    )
  }

// export default AddContact