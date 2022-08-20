import React from 'react'
import styled from 'styled-components';
//   Present - "Contact manage"

const Wrapper = styled.div`
  text-align: center;
`

const ContactHeader = styled.div`
  color: rgba(255, 255, 225, 0.7)
  letter-spacing: 2px;
  margin-top: 1rem;
`;

const Header = () => {
  return (
   <Wrapper>
        <h1>
        <ContactHeader >Contact Manage</ContactHeader>
        </h1>
    </Wrapper>
  );
};

export default Header