import React from 'react';
import styled from 'styled-components';
import HeaderLink from './headerLink';

const Wrapper = styled.div`
  padding: 1rem;
  margin-bottom: 2rem;
`;

const SettingsHeader = ({ org_id }) => {
  return (
    <Wrapper>
      <HeaderLink path={`/app/${org_id}/settings`} text="Organization" />
      <HeaderLink path={`/app/${org_id}/settings/payment`} text="Payment" />
      <HeaderLink path={`/app/${org_id}/settings/subscription`} text="Subscription" />
    </Wrapper>
  );
};

export default SettingsHeader;
