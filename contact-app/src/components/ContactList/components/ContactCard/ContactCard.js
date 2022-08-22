import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import user from '../../../../images/user.png';


const Icon = styled.div`
 text-align: right; 
`
const ContactCard = (props) => {

 const {id, name, mobile, email} = props.contact;

  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user"/>
        <div className="content">
             <div className="header">
             {name}
          </div>
          <div>{mobile}</div>
          <div>{email}</div>
        </div>
        <Icon>
        <i 
          className="trash alternate outline icon" 
          style={{color:"red", marginTop:"7px", marginLeft: "10px" }}
          onClick={() => props.clickHandler(id)}
        >
        </i>
        </Icon>  
         <Link 
           to={"/edit"}
           state= {{ contact: props.contact }} >
            <Icon>
              <i 
                className="edit alternate outline icon"
                style={{color: "teal", marginTop: "7px"}}
              >
            </i>
            </Icon>
        </Link>
      </div>
  )
}

export default ContactCard