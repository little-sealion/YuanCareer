import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  text-align: center;
`;

const ContactHeader = styled.div`
  color: rgba(255, 255, 225, 0.7)
  letter-spacing: 2px;
  margin-top: 1rem;
`;

const Header = () => {
  return (
    <Wrapper>
      <h1>
        <Link to="/">
          <ContactHeader>Draw Practise</ContactHeader>
        </Link>
      </h1>
    </Wrapper>
  );
};

export default Header;
