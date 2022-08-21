import React from 'react'

const EditContact = () => {
  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" >
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
          />
        </div>
        <div className="field">
          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
          />
           </div>
        <div className="field">
          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
          />
        </div>
        <button className="ui button teal">Update</button>
      </form>
    </div>
  );
}

export default EditContact