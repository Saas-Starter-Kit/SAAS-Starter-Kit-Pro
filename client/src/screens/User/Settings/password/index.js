import React from 'react';
import styled from 'styled-components';
import PasswordCard from './updatePasswordCard';
import SettingsHeader from '../../../../components/User/Navigation/settingsHeader';

const Title = styled.h1`
  font-size: 1.5rem;
`;

const PasswordSettings = () => {
  return (
    <div>
      <SettingsHeader />
      <Title>Password Settings </Title>
      <PasswordCard />
    </div>
  );
};

export default PasswordSettings;
