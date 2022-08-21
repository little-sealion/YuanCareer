import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import user from '../../images/user.png';


const Icon = styled.div`
 text-align: right; 
`
const ContactCard = (props) => {

 const {id, name, mobile, email} = props.contact;

  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user"/>
        <div className="content">
          <Link to={`/contact/${id}`} >
          <div className="header">
            {name}
          </div>
          <div>{mobile}</div>
          <div>{email}</div>
          </Link>
        </div>
        <Icon>
        <i 
        className="trash alternate outline icon" 
        style={{color:"red", marginTop:"7px"}}
        onClick={() => props.clickHandler(id)}
        >
        </i>
        </Icon>  
        <Icon>
          <i className="edit alternate outline icon"
        style={{color: "teal", marginTop: "7px"}}></i>
        </Icon>
      </div>
  )
}

export default ContactCard