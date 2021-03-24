import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 1rem;
  margin-bottom: 2rem;
`;

const SettingsHeader = ({ org_id }) => {
  return (
    <Wrapper>
      <Link
        className="header_link_settings"
        activeClassName="header_link_settings_active"
        to={`/app/${org_id}/settings`}
      >
        Organization
      </Link>
      <Link
        className="header_link_settings"
        activeClassName="header_link_settings_active"
        to={`/app/${org_id}/settings/payment`}
      >
        Payment
      </Link>
      <Link
        className="header_link_settings"
        activeClassName="header_link_settings_active"
        to={`/app/${org_id}/settings/subscription`}
      >
        Subscription
      </Link>
    </Wrapper>
  );
};

export default SettingsHeader;
