import React, { useState, useContext, useEffect } from 'react';
import { navigate } from 'gatsby';

import OrgContext from '../../../../utils/orgContext';
import ApiContext from '../../../../utils/apiContext';
import axios from '../../../../services/axios';

import SEO from '../../../../components/Marketing/Layout/seo';
import LoadingOverlay from '../../../../components/Common/loadingOverlay';
import styled from 'styled-components';

import SettingsHeader from '../../../../components/App/Navigation/settingsHeader';
import Card from '../../../../components/Common/Card';

const Title = styled.h1`
  font-size: 1.5rem;
`;

const OrgSettings = ({ org_id }) => {
  const { orgState } = useContext(OrgContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [orgName, setOrgName] = useState();

  /* eslint-disable */
  useEffect(() => {
    return () => fetchSuccess();
  }, []);
  /* eslint-enable */

  const handleSubmit = () => {};

  const handleOrgChange = (event) => {
    setOrgName(event.target.value);
  };

  const seoData = {
    title: 'Saas Starter Kit Pro Account page',
    description: 'Saas Starter Kit Pro Account page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <div>
        <SettingsHeader org_id={org_id} />
        <Title>Org Settings</Title>
        {isLoading && <LoadingOverlay />}
        <Card>
          <h2>Change Org Name</h2>
          <form onSubmit={handleSubmit}></form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default OrgSettings;
