import React from 'react';
import styled from 'styled-components';
import GoogleButton from 'react-google-button';

const StyledGoogleButton = styled(GoogleButton)`
  margin-top: 2rem;
`;

const GoogleStyledButton = ({ GoogleSignin }) => {
  return (
    <StyledGoogleButton
      style={{ width: '100%' }}
      label="Sign-Up with Google"
      onClick={GoogleSignin}
    />
  );
};

export default GoogleStyledButton;
