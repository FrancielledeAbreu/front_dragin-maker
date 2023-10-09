import React from 'react';
import { StyledHeader, LogoutButton } from './styledComponents';
import { useNavigate } from 'react-router-dom';

const Header = () => {
const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <StyledHeader>
      <h1>Front Dragon Maker</h1>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </StyledHeader>
  );
};

export default Header;
