import React from 'react';
import styled from 'styled-components';

const StyledOrContinueWithText = styled.p`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin-top: 1rem;
`;

const StyledSpan = styled.span`
  background: #fff;
  padding: 0 0.7rem;
`;

const ContinueWith = () => {
  return (
    <StyledOrContinueWithText>
      <StyledSpan>Or Continue With</StyledSpan>
    </StyledOrContinueWithText>
  );
};

export default ContinueWith;
