import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1rem;
  margin-bottom: 2rem;
`;

const SettingsHeader = () => {
  return (
    <Wrapper>
      <Link
        className="header_link_settings"
        activeClassName="header_link_settings_active"
        to="/user/settings/account"
      >
        Account
      </Link>
      <Link
        className="header_link_settings"
        activeClassName="header_link_settings_active"
        to="/user/settings/payment"
      >
        Payment
      </Link>
      <Link
        className="header_link_settings"
        activeClassName="header_link_settings_active"
        to="/user/settings/subscription"
      >
        Subscription
      </Link>
    </Wrapper>
  );
};

export default SettingsHeader;
