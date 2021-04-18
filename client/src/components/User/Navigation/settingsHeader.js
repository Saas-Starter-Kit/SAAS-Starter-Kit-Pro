import React from 'react';
import styled from 'styled-components';
import HeaderLink from './headerLink';

const Wrapper = styled.div`
  padding: 1rem;
  margin-bottom: 2rem;
`;

const SettingsHeader = () => {
  return (
    <Wrapper>
      <HeaderLink path="/user/settings/account" text="Account" />
      <HeaderLink path="/user/settings/password" text="Password" />
    </Wrapper>
  );
};

export default SettingsHeader;
