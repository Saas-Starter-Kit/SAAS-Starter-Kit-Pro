import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Empty } from 'antd';

import AuthContext from '../../../utils/authContext';
import ApiContext from '../../../utils/apiContext';
import { breakpoints } from '../../../styles/theme';
import axios from '../../../services/axios';

import SEO from '../../../components/Marketing/Layout/seo';
import LoadingOverlay from '../../../components/Common/loadingOverlay';
import Card from '../../../components/Common/Card';
import Button from '../../../components/Common/buttons/PrimaryButton';

import DangerButton from '../../../components/Common/buttons/DangerButton';
import TextInput from '../../../components/Common/forms/TextInput';
import FieldLabel from '../../../components/Common/forms/FieldLabel';
import TextInputWrapper from '../../../components/Common/forms/TextInputWrapper';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${breakpoints.medium}) {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid black;
  max-width: 24rem;
  width: 100%;
`;

const CreateAppWrapper = styled.div`
  width: 24rem;
`;

const RoleText = styled.div`
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  font-size: 1.075rem;
  font-weight: 500;
  color: black;
`;

const StyledLink = styled.div`
  color: black;
  font-size: 1.3rem;
  font-weight: 500;
`;

const AppsSection = styled.div`
  margin: 0;
  @media (min-width: ${breakpoints.medium}) {
    margin-right: 5rem;
  }
`;

const StyledHeader = styled.h1`
  text-align: center;
  @media (min-width: ${breakpoints.medium}) {
    text-align: left;
  }
`;

const AppsWrapper = styled.div`
  width: 24rem;
  padding-bottom: 3rem;
`;

const Dashboard = () => {
  const { authState } = useContext(AuthContext);
  const { fetchFailure, fetchInit, fetchSuccess, apiState } = useContext(ApiContext);
  const { isLoading } = apiState;
  const [orgs, setOrgs] = useState([]);
  let token = authState?.user.jwt_token;
  const headers = { Authorization: `Bearer ${token}` };

  /* eslint-disable */
  useEffect(() => {
    if (authState.user.id) {
      getOrgs();
    }
  }, [authState]);
  /* eslint-enable */

  const getOrgs = async () => {
    let user_id = authState.user.id;

    let params = {
      user_id
    };

    const result = await axios.get(`/api/org`, { params, headers }).catch((err) => {
      fetchFailure(err);
    });
    console.log(result);
    let adminOrgs = result.data.filter((item) => item.role === 'admin');

    setOrgs(adminOrgs);
    fetchSuccess();
  };

  const postOrg = async (event) => {
    event.preventDefault();
    fetchInit();

    let org_name = event.target.name.value;
    let email = authState.user.email;
    let user_id = authState.user.id;
    let role = 'admin';

    let data = {
      org_name,
      role,
      email,
      user_id
    };

    await axios.post(`/api/org`, data, { headers }).catch((err) => {
      fetchFailure(err);
    });

    getOrgs();
    fetchSuccess();
  };

  const seoData = {
    title: 'Saas Starter Kit Pro Dashboard page',
    description: 'Saas Starter Kit Pro Dashboard page'
  };

  return (
    <React.Fragment>
      <SEO seoData={seoData} />
      <div>
        {isLoading && <LoadingOverlay />}
        <StyledHeader>Dashboard</StyledHeader>
        <ContentWrapper>
          <AppsSection>
            <h2>My Orgs:</h2>
            <AppsWrapper>
              {!orgs.length == 0 ? (
                orgs.map((org) => (
                  <Link to={`/app/${org.id}/dashboard`} state={{ org }}>
                    <StyledCard key={org.id}>
                      <StyledLink>{org.org_name}</StyledLink>

                      <RoleText>Role: admin</RoleText>
                    </StyledCard>
                  </Link>
                ))
              ) : (
                <Empty />
              )}
            </AppsWrapper>
          </AppsSection>
          <CreateAppWrapper>
            <h2>Create Org:</h2>
            <form onSubmit={postOrg}>
              <StyledCard>
                <TextInputWrapper>
                  <FieldLabel htmlFor="name">
                    Create: <TextInput type="text" name="name" />
                  </FieldLabel>
                </TextInputWrapper>
                <Button type="submit">Save</Button>
              </StyledCard>
            </form>
          </CreateAppWrapper>
        </ContentWrapper>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
