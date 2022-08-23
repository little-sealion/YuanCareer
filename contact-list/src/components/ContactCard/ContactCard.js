import React from 'react'
import styled from 'styled-components';
import user from '../../images/User_Icon.png';


const Icon = styled.div`
 text-align: right; 
`
const ContactCard = (props) => {
  // eslint-disable-next-line
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
        <i className="trash alternate outline icon" style={{color:"red", marginTop:"7px"}}></i>
        </Icon>  
        <Icon>
          <i className="edit alternate outline icon"
        style={{color: "blue", marginTop: "7px"}}></i>
        </Icon>
      </div>
  )
}

export default ContactCard